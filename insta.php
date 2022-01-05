<?php
// new api
$accessToken = "IGQVJYazVmdDJjRm9BckZAEbmFFWDRTcDFaR29ad0UzSGQzdlRGTW9xSVByYk4yVU5kdVJEQWdQNlNjQlAtM19GZA3pjMTlUdHd2SENETDdreHQybXlkdXU0Tms2RlJMdWpESVI4ZAm10OFcxZA3BmY0hmUAZDZD"; // получаем токен
$tokenDate = "03.12.2021"; // получаем дату создания
$tokenTimestamp = strtotime($tokenDate);
$curTimestamp = time();
$dayDiff = ($curTimestamp - $tokenTimestamp) / 86400;

if (!empty($accessToken)) {
  if ($dayDiff > 50) {
    $url = "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=" . $accessToken;
    $instagramCnct = curl_init();
    curl_setopt($instagramCnct, CURLOPT_URL, $url);
    curl_setopt($instagramCnct, CURLOPT_RETURNTRANSFER, 1);
    $response = json_decode(curl_exec($instagramCnct));
    curl_close($instagramCnct);

    // обновляем токен и дату его создания в базе

    $accessToken = $response->access_token; // обновленный токен
  }

  $url = "https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,timestamp,thumbnail_url,permalink&limit=6&access_token=" . $accessToken;
  $instagramCnct = curl_init();
  curl_setopt($instagramCnct, CURLOPT_URL, $url);
  curl_setopt($instagramCnct, CURLOPT_RETURNTRANSFER, 1);
  $media = json_decode(curl_exec($instagramCnct));
  curl_close($instagramCnct);

  $instaFeed = array();
  foreach ($media->data as $mediaObj) {
    if (!empty($mediaObj->children)) {
      foreach ($mediaObj->children->data as $children) {
        $instaFeed[$children->id]["src"] = $children->media_url;
        $instaFeed[$children->id]["preview"] = $children->thumbnail_url;
        $instaFeed[$children->id]["link"] = $children->permalink;
        $instaFeed[$children->id]["media_type"] = $children->media_type;
      }
    } else {
      $instaFeed[$mediaObj->id]["src"] = $mediaObj->media_url;
      $instaFeed[$mediaObj->id]["preview"] = $mediaObj->thumbnail_url;
      $instaFeed[$mediaObj->id]["link"] = $mediaObj->permalink;
      $instaFeed[$mediaObj->id]["media_type"] = $mediaObj->media_type;
    }
  }
} ?>
<div class="insta__images images"><?php foreach($instaFeed as $key => $post): ?><?php if ($post["media_type"] === "VIDEO"): ?><div class="images__item"><div class="images__inner"><a href="<?php echo $post["link"]; ?>" class="images__post" target="_blank" ><img src="<?php echo $post["preview"]; ?>" alt="instagram post"></a></div></div><?php else: ?><div class="images__item"><div class="images__inner"><a href="<?php echo $post["link"]; ?>" class="images__post" target="_blank"><img src="<?php echo $post["src"]; ?>" alt="instagram post"></a></div></div><?php endif; ?><?php endforeach; ?></div>