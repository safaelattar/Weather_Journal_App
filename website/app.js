// Global Variables
const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric";
const apiKey = "786e5fb795f12732a4ed1538779a54e7";

// Output Elements (update UI)
const date = document.getElementById("date");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const content = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString
let newDate = d.toDateString();

const generateClick = () => {
    const zip = document.getElementById("zip").value;
    const url = `${baseUrl}&zip=${zip}&appid=${apiKey}`;
    let feelings = document.getElementById("feelings").value;

    if (!zip)
        alert("Please enter zip code!");
    if (!feelings)
        alert("Please write your felling!");

    getData(url).then((data) => {
        postData("/add", {
            date: newDate,
            city: data.city.name,
            temp: Math.round(data.list[0].main.temp),
            description: data.list[0].weather[0].description,
            content: feelings,
        }).then(updateUI("/all"));
    });
};

const getData = async (url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};


const updateUI = async (url) => {
    const request = await fetch(url);
    try {
        const updateData = await request.json();
        date.innerHTML = `Date: ${updateData.date}`;
        city.innerHTML = `City: ${updateData.city}`;
        temp.innerHTML = 'Temperature: ' + updateData.temp + '&degc';
        description.innerHTML = `Description: ${updateData.description}`;
        content.innerHTML = updateData.content;
    } catch (error) {
        console.log("error", error);
    }
};

// Click Event
const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", generateClick);