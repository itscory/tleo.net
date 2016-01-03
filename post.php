<?php

$subject = 'tleo.net contact form message';

if($_SERVER['REQUEST_METHOD'] == 'POST') {

	$name		= stripslashes(trim($_POST['form_name']));
	$email		= stripslashes(trim($_POST['form_email']));
	$message	= stripslashes(trim($_POST['form_message']));

if (($name == null) || ($email == null) || ($message == null)) {
        die("0");
}

	$to = "corey@tleo.net";
        $subject = "tleo.net form";
         
         $emessage = "<b>This is HTML message.</b>";
         $emessage .= "<h1>tleo.net form message</h1>";
	$emessage .= "<p>Message: ".$message."</p>";
	$emessage .= "<p>IP: ".$_SERVER['REMOTE_ADDR']."</p>";        
         $header = "From:".$email." \r\n";
         $header .= "MIME-Version: 1.0\r\n";
         $header .= "Content-type: text/html\r\n";
         
         $retval = mail ($to,$subject,$emessage,$header);
         
         if( $retval == true ) {
            echo "1";
         }else {
            echo "0";
         }
}else{
	echo "0";
}

?>
