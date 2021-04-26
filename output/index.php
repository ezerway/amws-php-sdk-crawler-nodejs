<?php

require './vendor/autoload.php';
require_once ('./.config.inc.php');


$serviceUrl = "https://mws.amazonservices.com/Sellers/2011-07-01";

$config = array (
    'ServiceURL' => $serviceUrl,
    'ProxyHost' => null,
    'ProxyPort' => -1,
    'ProxyUsername' => null,
    'ProxyPassword' => null,
    'MaxErrorRetry' => 3,
);

$r = new MarketplaceWebServiceSellers_Client(
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    APPLICATION_NAME,
    APPLICATION_VERSION,
    $config
);
$request = new MarketplaceWebServiceSellers_Model_ListMarketplaceParticipationsRequest();
$request->setSellerId(MERCHANT_ID);

var_dump($r->listMarketplaceParticipations($request));
