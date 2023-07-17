<?php
require_once 'adminer.php';

function adminer_object()
{
    class AdminerCustomization extends Adminer
    {
        public function credentials()
        {
            return array('localhost:3000', 'username', 'password');
        }

        public function name()
        {
            return 'admin';
        }

        public function loginFormField($name, $heading, $value)
        {
            return "<input type='text' name='$name' value='$value' placeholder='Introduceți $heading'>";
        }

    }

    return new AdminerCustomization;
}

$adminer = new AdminerCustomization;
$adminer->main();
?>
