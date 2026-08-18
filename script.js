const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbycQbcXURJnkMnEn_ulUHuoJc-xHwusgfCpO1Kymua0DTuLrFH7bccs5asR1zy-c7Vi/exec";


const form =
    document.getElementById("queryForm");

const button =
    document.getElementById("submitButton");

const message =
    document.getElementById("message");

const queryBox =
    document.getElementById("query");

const counter =
    document.getElementById("counter");


queryBox.addEventListener(
    "input",
    function () {

        counter.textContent =
            queryBox.value.length;

    }
);


form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        button.disabled = true;

        button.textContent =
            "Submitting...";

        message.className =
            "message";

        message.textContent = "";


        const data = {

            enrollmentNo:
                document.getElementById(
                    "enrollmentNo"
                ).value.trim(),

            studentName:
                document.getElementById(
                    "studentName"
                ).value.trim(),

            email:
                document.getElementById(
                    "email"
                ).value.trim(),

            program:
                document.getElementById(
                    "program"
                ).value,

            semester:
                document.getElementById(
                    "semester"
                ).value,

            category:
                document.getElementById(
                    "category"
                ).value,

            query:
                document.getElementById(
                    "query"
                ).value.trim()

        };


        try {

            /*
             * Apps Script Web Apps can be awkward
             * with browser CORS handling.
             *
             * no-cors allows the POST request
             * to reach Apps Script.
             */

            await fetch(
                SCRIPT_URL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(data)
                }
            );


            message.className =
                "message success";

            message.innerHTML = `
                <strong>
                    Query Submitted Successfully!
                </strong>
                <br><br>
                A confirmation email will be
                sent to your registered email address.
            `;


            form.reset();

            counter.textContent = "0";


        } catch (error) {

            console.error(error);

            message.className =
                "message error";

            message.textContent =
                "Unable to submit the query. Please try again.";

        }


        button.disabled = false;

        button.textContent =
            "Submit Query";

    }
);