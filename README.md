Sky Betting & Gaming
====

PHP & Frontend Technical Test
===

Introduction
---
Congratulations on being selected to complete the Sky Betting & Gaming Technical Test!

We hope that you find this exercise fun. There are no trick questions - we want to see well thought-out and well structured code.


The Brief
---
The aim of the test is to produce a system capable of loading, modifying and saving some data using PHP, HTML and JS. You should use best­practices where appropriate, ensuring that you separate your presentation and logic and that your code is modular where possible.


Step 1 ­ MVC Form Handler
---

Make a simple MVC application from scratch to process posted form data, saving it to file and reading it back out again in order to update the records.

* The application structure is of your choosing, and the entities should be modelled appropriately
* The markup is provided at the end of this document and, as it stands, doesn't submit to anywhere; use it to create your view
* For storage you should write the data in php serialized format to 'data.ser' or similar on disk
* The form fields should be repopulated from that data file when the page loads or following a Save operation

To complete this step extend your system to support a new 'jobtitle' field, which will be populated for at least some of the records.

Add appropriate unit tests using phpunit.

You should now take a copy of your files before moving on to step 2, as this step will involve modifying your work.

Step 2 ­ Asynchronous Loading and Saving
---

The brief for this step is to replicate the functionality of Step 1, but achieve the load and save operations asynchronously from the browser, transferring a JSON structure to represent the data back to the server.

* You should aim to use php://input to receive the post data
* For the client side element you can use your own Javascript or base it on an open source framework
* Develop the code for a modern browser of your choice and let us know what it has been tested in

On completion of the above steps, or after the allotted time is up ­ zip the entire contents of your work and send the file back via email. Remember to send the submission to both email addresses as instructed, to avoid falling into the Sky spam filter.

Don't worry if you don't finish all of the steps, we're more interested in how you implement the steps which you do complete.

Implementation Notes
---

* Use of PHP frameworks is discouraged
* Use of a frontend Javascript framework is allowed
* Using composer for autoloading, tactical libraries & phpunit is allowed

Remember: we can only assess you on the code you write so make sure that what you submit shows you at your best.

Appendix ­ Form Markup
---

An example of the initial HTML form is below. You may choose to use this if you wish.

```html
<form>
    <table>
        <tr>
            <th>First name</th>
            <th>Last name</th>
        </tr>
        <tr>
            <td><input type="text" name="people[][firstname]" value="Leonard" /></td>
            <td><input type="text" name="people[][surname]" value="Hofstader" /></td>
        </tr>
        <tr>
            <td><input type="text" name="people[][firstname]" value="Sheldon" /></td>
            <td><input type="text" name="people[][surname]" value="Cooper" /></td>
        </tr>
        <tr>
            <td><input type="text" name="people[][firstname]" value="Raj" /></td>
            <td><input type="text" name="people[][surname]" value="Koothrapali" /></td>
        </tr>
        <tr>
            <td><input type="text" name="people[][firstname]" value="Howard" /></td>
            <td><input type="text" name="people[][surname]" value="Wolowitz" /></td>
        </tr>
        <tr>
            <td><input type="text" name="people[][firstname]" value="Penny" /></td>
            <td><input type="text" name="people[][surname]" value="" /></td>
        </tr>
    </table>
    <input type="submit" value="OK" />
</form>
```

