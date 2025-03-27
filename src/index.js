import "./reset.css";
import "./styles.css";
import { greeting } from "./greeting.js";
import { compareAsc, format } from "date-fns";

console.log(greeting);
console.log(format(new Date(2014, 1, 11), "yyyy-MM-dd"));

const dates = [
    new Date(1995, 6, 2),
    new Date(1987, 1, 11),
    new Date(1989, 6, 10),
];

dates.sort(compareAsc);
console.log(dates);

document.addEventListener("click", () => {
    console.log('clicked');
    console.log(format(new Date(), "yyyy-MM-dd"));
});