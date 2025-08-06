export function currentTime() {
 let date = new Date();
 let hh: string | number = date.getHours();
 let mm: string | number = date.getMinutes();
 let session = "AM";

 if (hh === 0) {
   hh = 12;
 }
 if (hh > 12) {
   hh = hh - 12;
   session = "PM";
 }

 hh = hh < 10 ? "0" + hh : hh;
 mm = mm < 10 ? "0" + mm : mm;

 return hh + ":" + mm  + " " + session;
}