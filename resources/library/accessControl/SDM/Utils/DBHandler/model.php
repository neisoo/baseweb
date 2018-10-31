<?php
/*** Version 1.0.1 ***/
include_once dirname(__FILE__).'/SDMDBParameters.php';

/**
 * SDM DBHandler V0.0.1
 * Support mysql database.
 * @author pun
 *
 */

class SDMDBH{

	/**
	 * Database parameter type integer
	 * @var int
	 */
	const DB_VALUE_TYPE_INT = PDO::PARAM_INT;

	/**
	 * Database parameter type string
	 * @var int
	 */
	const DB_VALUE_TYPE_STR = PDO::PARAM_STR;

	/**
	 * Database parameter type float
	 * @var int
	 */
	const DB_VALUE_TYPE_FLOAT = PDO::PARAM_STR;

	/**
	 * Database parameter type date
	 * @var int
	 */
	const DB_VALUE_TYPE_DATE = PDO::PARAM_STR;

	private static $ERROR_CONNECTION 			= 		"10001";
	private static $ERROR_STORED_PROCEDURE 		= 		"10101";
	private static $ERROR_NO_SUCH_TABLE			=		"10102";
	private static $ERROR_PARAM_SEQ_NOT_MATCH	= 		"10111";
	private static $ERROR_PARAM_CLASS  			= 		"10112";
	private static $ERROR_UNDEFINED				= 		"10900";

	private $pdo;
	private $stmp;
	private $m_result = "0";
	private $m_result_message = "";
	private $m_result_count = 0;
	private $m_result_response = null;
	private $mSeqArr;

	private $db_opts = array(
		 	"PDO::MYSQL_ATTR_USE_BUFFERED_QUERY"=>false,
			"PDO::ATTR_TIMEOUT"=>20,
			"PDO::MYSQL_ATTR_INIT_COMMAND"=>"set names utf8",
			"PDO::ATTR_ERRMODE" => PDO::ERRMODE_EXCEPTION
	);


	private static $instance;


	private function __construct(){

		require_once dirname(__FILE__).'/config.php';

		$dns = $driver.":";
		$dns .= "host=".$host.";";
		if(!empty($port)){
			$dns .= "port=".$port.";";
		}
		$dns .= "dbname=".$db_name;

		try {
			$this->pdo = new PDO($dns, $username, $password, $this->db_opts);
		}catch (PDOException $e){
			$this->handle_error($e->getCode());
		}
	}

	public static function getInstance(){
		if(!self::$instance){
			self::$instance = new SDMDBH();
		}
		return self::$instance;
	}

	/**
	 * Function: Excute stored procedure
	 * @param $query string
	 * @param $params SDMDBParameters
	 * @return string
	 */
	public function execute_stored_procedure($query, $params=null){

		if($this->checkObj()){
			try {
				if(isset($params)){
					if(gettype($params) == "object" && get_class($params) == "SDMDBParameters"){
						$params = $params->getParams();
					}else{
						throw new PDOException("Not a SDMDBParameters class", self::$ERROR_PARAM_CLASS);
					}
				}
				$query = $this->getQuery($query, $params);
				$this -> stmp = $this->pdo->prepare("CALL ".$query);
				if(isset($params)){
					;
					$this->setParams($params);
				}

				$this->fetch_data();

			}catch (PDOException $e){
				$this->handle_error($e->getCode());
			}
		}
		return $this->genResultJson();
	}

	/**
	 * Function: Excute sql statement
	 * @param $query string
	 * @return string
	 */
	public function execute_sql_statement($query){
		if($this->checkObj()){
			try {
				$this -> stmp = $this -> pdo -> prepare($query);
				$this -> fetch_data();

			}catch (PDOException $e){
				$this->handle_error($e->getCode());
			}
		}
		return $this->genResultJson();
	}

	private function checkSeq($params){
		$seq_count = sizeof($this->mSeqArr);
		$params_count = sizeof($params);

		if($seq_count!=$params_count){
			throw new PDOException("Parameters and Parameters' sequence not match", self::$ERROR_PARAM_SEQ_NOT_MATCH);
		}else{

			foreach ($this->mSeqArr as $s){
				$found = false;
				foreach ($params as $p){
					if(trim($s) == $p["name"]){
						$found = true;
					}
				}
				if(!$found){
					throw new PDOException("Parameters and Parameters sequence not match", self::$ERROR_PARAM_SEQ_NOT_MATCH);
				}
			}
		}
	}

	private function setParams($params){
		foreach ($params as $i => $value){
			if($value["type"] != SDMDBParameters::SDM_PARAMS_TYPE_IN_OUT){
				if(isset($value["name"])){
					$this -> stmp -> bindParam(":".$value['name'], $value['value']);
				}else{
					$this -> stmp -> bindParam(":".$i, $value['value']);
				}
			}
		}
	}

	private function getQuery($query, $params){
		$fill_param = "";
		if(isset($this->mSeqArr)){
			foreach ($this->mSeqArr as $s){
				$fill_param .= ":".trim($s).", ";
			}
		}else{
			if(isset($params)){
				foreach ($params as $i => $s){
					if($s["type"] == SDMDBParameters::SDM_PARAMS_TYPE_IN_OUT){
						$fill_param .= $s["value"].", ";
					}else{
						if(isset($s["name"])){
							$fill_param .= ":".$s["name"].", ";
						}else{
							$fill_param .= ":".$i.", ";
						}
					}
				}
			}
		}

		if(isset($seq) && isset($params)){
			$this->checkSeq($seq_arr, $params);
		}

		if(isset($params)){
			$query .= "(";
			$query .= substr($fill_param, 0, strlen($fill_param)-2);;
			$query .= ")";
		}
		return $query;
	}

	private function checkObj (){
		if(isset($this->pdo)){
			return true;
		}else{
			$this->m_result="fail";
			$this->handle_error(SDMDBH::$ERROR_CONNECTION);
			return false;
		}
	}

	private function fetch_data(){
		if(!$this->stmp->execute()){
			$this->handle_error($this->stmp->errorCode());
		}else{
			if($this->m_result_response = $this->stmp->fetchAll(PDO::FETCH_ASSOC)){
				$this->m_result_count = $this->stmp->rowCount();
			}
		}
	}

	private function genResultJson(){
		$jsonArray["response"]["system"]["errorNo"] = $this->m_result;
		$jsonArray["response"]["system"]["errorMsg"] = $this->m_result_message;
		$jsonArray["response"]["system"]["rowCount"] = $this->m_result_count;
		if(isset($this->m_result_response)){
			$jsonArray["response"]["resultSet"] = $this->m_result_response;
		}
		$this->reset();
		return json_encode($jsonArray);
	}


	private function reset(){
		$this -> m_result = "0";
		$this -> m_result_message = "";
		$this -> m_result_count = 0;
		$this -> m_result_response = null;
	}

	private function handle_error($errorCode){
		switch ($errorCode){
			case SDMDBH::$ERROR_CONNECTION:
				$this->m_result = $errorCode;
				$this->m_result_message = "Connection Error";
				break;
			case SDMDBH::$ERROR_PARAM_SEQ_NOT_MATCH:
				$this->m_result = $errorCode;
				$this->m_result_message = "Parameters and parameter sequence not match";
				break;
			case SDMDBH::$ERROR_PARAM_CLASS:
				$this->m_result = $errorCode;
				$this->m_result_message = "Not a SDMDBParameters class";
				break;
			case "42S02":
				$this->m_result = self::$ERROR_NO_SUCH_TABLE;
				$errorInfo = $this->stmp->errorInfo();
				$this->m_result_message = $errorInfo[2];
				break;
			case "42000":
				$this->m_result = self::$ERROR_STORED_PROCEDURE;
				$errorInfo = $this->stmp->errorInfo();
				$this->m_result_message = $errorInfo[2];
				break;
			default:
				$this->m_result = self::$ERROR_UNDEFINED;
				$this->m_result_message = "Undefine Error $errorCode";
		}
	}

}

?>