<?php
function fib($num){
	if ($num > 2){
		return fib($num - 2) + fib($num - 1);	
	}
	else{
		return $num - 1;	
	}	
}

echo fib(35);
