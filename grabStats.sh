#!/bin/bash

YEAR=1996
NEXTYEAR=$((YEAR+1))
SEASON="$YEAR-${NEXTYEAR:2:2}"
CURRENTYEAR=$(date+'%Y')

until [ "$YEAR" -gt "$CURRENTYEAR" ]
do
  echo "Grabbing Stats for Season $SEASON"
  curl -o "${SEASON}.json" "https://stats.nba.com/stats/leaguedashplayerbiostats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&Season=${SEASON}&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=" -H 'Connection: keep-alive' -H 'sec-ch-ua: "Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"' -H 'DNT: 1' -H 'sec-ch-ua-mobile: ?0' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36' -H 'Accept: application/json, text/plain, */*' -H 'x-nba-stats-token: true' -H 'x-nba-stats-origin: stats' -H 'sec-ch-ua-platform: "Windows"' -H 'Origin: https://www.nba.com' -H 'Sec-Fetch-Site: same-site' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Dest: empty' -H 'Referer: https://www.nba.com/' -H 'Accept-Language: en-US,en;q=0.9' -H 'If-Modified-Since: Fri, 22 Oct 2021 20:34:49 GMT' --compressed
  ((YEAR++))
  ((NEXTYEAR++))
  SEASON="$YEAR-${NEXTYEAR:2:2}"
done
