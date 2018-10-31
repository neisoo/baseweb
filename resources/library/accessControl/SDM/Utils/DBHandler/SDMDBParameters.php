<?php 
/*** Version 1.0.1 ***/

class SDMDBParameters{
	const SDM_PARAMS_TYPE_STRING = PDO::PARAM_STR;
	const SDM_PARAMS_TYPE_INT = PDO::PARAM_INT;
	const SDM_PARAMS_TYPE_IN_OUT = PDO::PARAM_INPUT_OUTPUT;
	
	private $mParams;
	private $count = 0;
	public function add($value, $paramName=null,$type = PDO::PARAM_STR, $length = null){
		$this->mParams[$this->count]["value"] = $value;
		if(isset($paramName)){
			$this->mParams[$this->count]["name"] = $paramName;
		}else{
			$this->mParams[$this->count]["name"] = $this->count;
		}
		$this->mParams[$this->count]["type"] = $type;
		$this->mParams[$this->count]["len"] = $length;
		$this->count++;
	}
	
	public function getParams(){
		return $this->mParams;
	}
}
?>