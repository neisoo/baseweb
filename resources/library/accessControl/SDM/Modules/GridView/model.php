<?php 
/*** Version 1.1 ***/

include_once dirname(__FILE__).'/../../Utils/DBHandler/model.php';
class GridViewControlHandler{

	private $data;
	private $rowBreak = 0;
	private $page = 1;
	private $prefix = "";
	private $sortkey = "";
	private $desc = false;
	private $filter = null;
	private $format = "";
	private $dataType = "string";
	private $action = "getData";
	private $fileName = "";
	private $header = null;
	private $onlyVisible = false;

	public function __construct(){
		$this->init();
	}

	private function init(){
		if(isset($_POST["sdm_param"])){
			$sdm_param = json_decode($_POST["sdm_param"],true);
				
			foreach ($sdm_param as $p=>$param_item){
				$_POST[$p] = $param_item;
			}
		}

		if(isset($_POST["sdm_prefix"])){
			$this->prefix = $_POST["sdm_prefix"];
		}

		if(isset($_POST["sdm_page_break"])){
			$this->rowBreak = $_POST["sdm_page_break"];
		}

		if(isset($_POST["sdm_sort_key"])){
			$this->sortkey = $_POST["sdm_sort_key"];
		}

		if(isset($_POST["sdm_page_no"])){
			$this->page = $_POST["sdm_page_no"];
		}

		if(isset($_POST["sdm_sort_desc"])){
			$this->desc = $_POST["sdm_sort_desc"] == "false" ? false : true;
		}

		if(isset($_POST["sdm_sort_type"])){
			$this->dataType = $_POST["sdm_sort_type"];
		}

		if(isset($_POST["sdm_grid_filter"])){
			$this->filter = json_decode($_POST["sdm_grid_filter"],true);
		}

		if(isset($_POST["sdm_action"])){
			$this->action = $_POST["sdm_action"];
		}

		if(isset($_POST["sdm_config"])){
			$this->data = $_POST["sdm_config"];
		}

		if(isset($_POST["sdm_file_name"])){
			$this->fileName = $_POST["sdm_file_name"];
		}

		if(isset($_POST["sdm_header"])){
			$this->header = json_decode($_POST["sdm_header"],true);
		}

		if(isset($_POST["sdm_only_visible"])){
			$this->onlyVisible = $_POST["sdm_only_visible"] == "true" ? true : false;
		}

	}

	public function getRowBreak(){
		return $this->rowBreak;
	}

	public function getCurrentPage(){
		return $this->page;
	}

	public function getPrefix(){
		return $this->prefix;
	}

	public function getSortKey(){
		return $this->sortkey;
	}

	public function getIsSortDesc(){
		return $this->desc;
	}

	public function getSortDataType(){
		return $this->dataType;
	}

	public function getFilter(){
		return $this->filter;
	}

	public function getOnlyVisible(){
		return $this->onlyVisible;
	}



	public function getGridSrc($src, $totalRecord = null){
		if($totalRecord >= 0 && $totalRecord != null){
			$src =	$this->convertJson($src);
			$src = $this->findElement($src, $this->prefix);
			if(!$src[$this->prefix]){
				return $this->getSDMGridDataSrc("", 0);
			}
			$src = $src[$this->prefix];
			if($this->action == "getCSV"){
				return $this->getCsv($src);
			}else{
				return $this->getSDMGridDataSrc($src, $totalRecord);
			}
		}else{
			if($this->action == "getCSV"){
				if(!$this->onlyVisible){
					$limit = "";
				}else{
					$limit = $this->getStmtLimit();
				}
				$dbh = SDMDBH::getInstance();
				$src = $this->getViewData($dbh, $src, $this->getStmtSort(), $limit, $this->getStmtFilter());
				return $this->getCsv($src);

			}else{
				$dbh = SDMDBH::getInstance();
				$src = $this->getViewData($dbh, $src, $this->getStmtSort(), $this->getStmtLimit(), $this->getStmtFilter());
				$totalRecord = $this->getTotalPage($dbh);
				return $this->getSDMGridDataSrc($src, $totalRecord);
			}
		}
	}

	private function getSDMGridDataSrc($src, $totalRecord){
		if($src == ""){
			$returnData["dataSet"][$this->prefix][0] = $src;
		}else{
			$returnData["dataSet"][$this->prefix] = $src;
		}
		$returnData["totalRecord"] = $totalRecord;
		return json_encode($returnData);
	}

	private function getCsv($src){
		$drawArr = $this->createDrawArr($src);

		header( "Content-Type: text/csv;charset=utf-8" );
		header( "Content-Disposition: attachment;filename=\"".$this->fileName.".csv\"" );
		header("Pragma: no-cache");
		header("Expires: 0");

		$f = fopen('php://output', 'w');
		if(isset($drawArr)){
			foreach ($drawArr as $c=> $rows) {
				fputcsv($f, $rows);
			}
		}else{
			fputcsv($f, "");
		}
		fclose($f);
	}

	private function getViewData($dbh, $view, $sort, $limit, $filter){
		$dbh = SDMDBH::getInstance();

		$sp = "sp_SDM_GridView_GetGridPageFromView";

		$params = new SDMDBParameters();
		$params->add("@total",null,SDMDBParameters::SDM_PARAMS_TYPE_IN_OUT);
		$params->add($view);
		$params->add($sort);
		$params->add($limit);
		$params->add($filter);
		$data = $dbh->execute_stored_procedure($sp,$params);
		
		$json = "";
		$totalRecord = 0;

		$data = json_decode($data, true);
		return $data["response"]["resultSet"];
	}

	private function getTotalPage($dbh){
		$count_stmt = "SELECT @total";
		$result = 0;
		$response = json_decode($dbh->execute_sql_statement($count_stmt),true);
		if (isset($response["response"]["system"]["errorNo"])){
			if ($response["response"]["system"]["errorNo"] == "0"){
				$result = $response["response"]["resultSet"][0]["@total"];
			}
		}
		return $result;
	}



	public function getStmtSort(){
		$str = "";
		if($this->sortkey != "" && $this->sortkey != null){
			$str = " ORDER BY ".$this->sortkey;
			if($this->desc){
				$str .= " DESC";
			}		
		}

		return $str;
	}

	public function getStmtLimit(){
		$str = "";
		if($this->rowBreak > 0){
			$str = " LIMIT ".($this->rowBreak*$this->page).",".$this->rowBreak;
		}

		if($this->action == "getCSV"){
			if(!$this->onlyVisible){
				$str="";
			}
		}
		return $str;
	}

	public function getStmtFilter(){
		$str = "";
		if($this->filter != null){
			foreach ($this->filter as $i=>$item){
				if($item["value"] != "" && ($item["valueTo"] != "" || $item["filter"] != "between")){
					$str .= $this->getFilterStr(strtolower($item["filter"]), $item["value"], $item["valueTo"], $item["stringFormat"], strtolower($item["dataType"]), $item["fieldName"], $item["caseSensitive"]);
					$str .= " AND ";
				}
			}
		}

		if($str != ""){
			$str = " WHERE ".substr($str, 0,strlen($str)-4);
		}
		return $str;
	}

	private function getFilterStr($filter, $value, $valueTo, $format, $dataType, $fieldName, $caseSensitive){
		$str = "";

		if($dataType == "string" && $filter!="likeboth" && $filter!="likeleft" && $filter!="likelight"){
			$value = str_replace("%", "\%", $value);
			$value = str_replace("_", "\_", $value);
			
			if($format != ""){
				$value = str_replace("?", trim($value), $format);
				$valueTo = str_replace("?", trim($valueTo), $format);
			}else{
				$value = trim($value);
				$valueTo = trim($valueTo);
			}
		}
		switch ($filter){
			case "likeleft":
				if($caseSensitive){
					// 					$str .= "`".$fieldName."` like BINARY '".$value."%' ";
					$str .= $fieldName." like BINARY '".$value."%' ";
				}else{
					// 					$str .= "`".$fieldName."` like '".$value."%' ";
					$str .= $fieldName." like '".$value."%' ";

				}
				break;
			case "likeright":
				if($caseSensitive){
					// 					$str .= "`".$fieldName."` like BINARY '%".$value."' ";
					$str .= $fieldName." like BINARY '%".$value."' ";
				}else{
					// 					$str .= "`".$fieldName."` like '%".$value."' ";
					$str .= $fieldName." like '%".$value."' ";

				}
				break;
			case "equal":
				if($dataType == "string"){
					if($caseSensitive){
						// 						$str .= "BINARY `".$fieldName."` = '".$value."'";
						$str .= "BINARY ".$fieldName." = '".$value."'";
					}else{
						// 						$str .= "`".$fieldName."` = '".$value."'";
						$str .= $fieldName." = '".$value."'";
					}
				}else{
					// 					$str .= "`".$fieldName."` = ".$value;
					$str .= $fieldName." = ".$value;
				}
				break;
			case "between":
				// 				$str .= "`".$fieldName."`"." BETWEEN ".$value." AND ".$valueTo;
				$str .= $fieldName." BETWEEN ".$value." AND ".$valueTo;
				break;
			case "greaterthan":
				if($dataType == "string"){
					// 					$str .= "`".$fieldName."` > '".$value."'";
					$str .= $fieldName." > '".$value."'";
				}else{
					// 					$str .= "`".$fieldName."` > ".$value;
					$str .= $fieldName." > ".$value;
				}
				break;
			case "greaterorequal":
				if($dataType == "string"){
					// 					$str .= "`".$fieldName."` >= '".$value."'";
					$str .= $fieldName." >= '".$value."'";
				}else{
					// 					$str .= "`".$fieldName."` >= ".$value;
					$str .= $fieldName." >= ".$value;
				}
				break;
			case "lessthan":
				if($dataType == "string"){
					// 					$str .= "`".$fieldName."` <= '".$value."'";
					$str .= $fieldName." < '".$value."'";
				}else{
					// 					$str .= "`".$fieldName."` <= '".$value."'";
					$str .= $fieldName." < ".$value;
				}
				break;
			case "lessorequal":
				if($dataType == "string"){
					// 					$str .= "`".$fieldName."` <= '".$value."'";
					$str .= $fieldName." <= '".$value."'";
				}else{
					// 					$str .= "`".$fieldName."` >= ".$value;
					$str .= $fieldName." <= ".$value;
				}
				break;
			case "in":
					$str .= $fieldName." in(".$value.")";
				break;
			default:
				if($caseSensitive){
					// 					$str .= "`".$fieldName."` like BINARY '%".$value."%' ";
					$str .= $fieldName." like BINARY '%".$value."%' ";
				}else{
					// 					$str .= "`".$fieldName."` like '%".$value."%' ";
					$str .= $fieldName." like '%".$value."%' ";
				}
				break;
		}
		return $str;
	}

	private function convertJson($json){
		if(gettype($json) == "string"){
			$src =json_decode($json, true);
		}else if(gettype($json) == "array"){
			$src = $json;
		}else if(gettype($json) == "object"){
			$json = json_encode($json);
			$src = json_decode($json, true);
		}else{
			return null;
		}
		return $src;
	}

	private function getPage($src){
		if($this->rowBreak != 0){
			$src = array_slice($src, $this->page*$this->rowBreak, $this->rowBreak);
		}
		return $src;
	}

	private function findElement($element,$find_key){
		if (!is_array($element)) {
			return null;
		}

		if(isset($element[$find_key])){
			return $element;
		}else{
			foreach ($element as $key=>$ele){
				$found = $this->findElement($ele, $find_key);
				if($found != null){
					return $found;
				}
			}
		}
		return null;
	}

	private function createDrawArr($src) {
		$drawArr;
		$headerArr = $this->header;
		if (isset($src)) {
			foreach ($src as $row=>$item) {
				foreach ($headerArr as $header) {
					if(!isset($drawArr["header"][$header["idx"]])){
						$drawArr["header"][$header["idx"]] = $header["name"];
					}
					$drawArr[$row][$header["idx"]] = $src[$row][$header["id"]];
				}
			}
		} else if (isset($headerArr)) {
			foreach ($headerArr as $header) {
				if(!isset($drawArr["header"][$header["idx"]])){
					$drawArr["header"][$header["idx"]] = $header["name"];
				}
			}
		}
		return $drawArr;
	}
}
?>