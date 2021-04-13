/**
 * Author: Nguyen Khanh Duy Phan
 * Date: April 9, 2021
 */
const fetch = require('node-fetch')
var express = require("express");
var app = express();

// app.set('json spaces', 2);//JSON Output Formatting

//ROUTE 1
app.get("/api/ping", (req, res) => {
    res.json({ "success": true });
});

//ROUTE 2
app.get("/api/posts", async (req, res) => {
    var url_api = `https://api.hatchways.io/assessment/blog/posts`;
    let fetch_res = await fetch(url_api);
    res.json(await fetch_res.json());
});

app.get("/api/posts/:tags", async (req, res) => {
    const tags = req.params.tags.split(',');
    const json = await getDataFromTags(tags);
    res.json(json);
});

app.get("/api/posts/:tags/:sort", async (req, res) => {
    const tags = req.params.tags.split(',');
    const sort = req.params.sort;
    sortValidate(sort, res);
    const json = await getDataFromTags(tags);
    JSONSorting(json, sort, "asc");
    res.json(json);
});

app.get("/api/posts/:tags/:sort/:direction", async (req, res) => {
    const tags = req.params.tags.split(',');
    const sort = req.params.sort;
    sortValidate(sort, res);
    const direction = req.params.direction;
    dirValidate(direction, res);
    const json = await getDataFromTags(tags);
    JSONSorting(json, sort, direction);
    res.json(json);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

//Validate sort parameter
function sortValidate(str, res) {
    var arr = ["id", "reads", "likes", "popularity"];
    if (!arr.includes(str)) {
        res.json({ "error": "sortBy parameter is invalid" });
    }
}

//Validate direction parameter
function dirValidate(str, res) {
    var arr = ["asc", "desc"]
    if (!arr.includes(str)) {
        res.json({ "error": "direction parameter is invalid" });
    }
}

//Fetch data from one or many tags
async function getDataFromTags(tags) {
    let temp =
    {
        "posts": []
    };
    for (var tag of tags) {
        var url_api = `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`;
        let fetch_res = await fetch(url_api);
        let json = await fetch_res.json();
        // console.log(json)
        for (let post of json.posts) {
            temp.posts.push(post);
        }
    }
    // console.log(jsonList)
    temp = removeDuplicate(temp);

    return jsonList =
    {
        "posts": temp,
    };
}

//Remove duplicate objects of JSON created by fetching 2 or more different tags
function removeDuplicate(jsonList) {
    let jsonObject = jsonList.posts.map(JSON.stringify);
    // console.log(jsonObject.length);
    let uniqueSet = new Set(jsonObject);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    // console.log(typeof(uniqueArray));
    return uniqueArray;
}

//Sort by asc or desc. Default is by asc
function JSONSorting(jsonList, str, direction) {
    var arr = jsonList.posts;
    if (direction == "desc") {
        arr.sort(function (a, b) {
            if (a[str] < b[str]) return 1;
            if (a[str] > b[str]) return -1;
            return 0;
        });
    }
    else //Default sorting - asc
    {
        arr.sort(function (a, b) {
            if (a[str] < b[str]) return -1;
            if (a[str] > b[str]) return 1;
            return 0;
        });
    }
    console.log(arr);
    return json = {
        "posts": arr,
    };
}

