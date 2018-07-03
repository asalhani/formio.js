  # ELM Notes
  Clone this repository only in case you want to add features to the formio.js library or you discovered an issue in the library and you want to fix it. Otherwise, no need to clone it.

## Clone Formio.js Library and Connect it to the library's GitHub repo:
Use the below instructions to clone the library in your workspace and connect it to the remote GitHub repo in order to keep this repo updated with all the changes from the original publisher.
### 

> Note: This step should be performed only by someone who is
> responsiable about keeping this repo updated with GitHub. The normal
> user should only clone the repo to thier own machine and keep pulling
> ``` master ``` branch for any changes

 1. Clone formio.js repo (this repo) into your own workspace:

> ``` git clone git clone <YOUR_BITBUCKET_URL>/scm/pc/formiojs.git ```

 2. Add formiojs GitHub repo as a new remote in Bitbucket called "**sync**"
>```git remote add sync https://github.com/formio/formio.js.git ```

 3. Verify what are the remotes currently being setup for "formiojs" Bitbucket repo. This following command should show "fetch" and "push" for two remotes i.e. "origin" and "sync"

> ``` git remote -v ```

 4. Do a ```pull``` from the ```master``` branch in the ```sync``` remote to clone the GitHub project locally:
>``` git pull sync master ```

 5. Setup a local branch called ```GitHub``` that tracks the ```sync``` remote's ```master``` branch:
>``` git branch --track github sync/master ```

 6. Push the local ```master``` branch to the ```origin``` remote in Bitbucket (this repo):
>```git push -u origin master ```

**If you want to pull the latest changes from GitHub repo into this repo, follow the below steps:**

 1. Checkout ``` Github ``` branch:
 > ``` git checkout github ```
 2. Run merge command from ``` sync/github ```
 > git merge sync/github
 
# JavaScript powered forms and SDK for Form.io
This library is a plain JavaScript form renderer and SDK for Form.io. This allows you to render the JSON schema forms produced by Form.io and render those within your application using plain JavaScript, as well as provides an interface SDK to communicate to the Form.io API's. The benefits of this library include.

 - Plain JavaScript implementation using ES6 and Modern practices (no jQuery, Angular, React, or any other framework dependency)
 - Renders a JSON schema as a webform and hooks up that form to the Form.io API's
 - Complete Form Builder which creates the JSON schema used to render the forms.
 - Nested components, layouts, Date/Time, Select, Input Masks, and many more included features
 - Full JavaScript API SDK library on top of Form.io
 
## Examples and Demonstration
To find out more about this library as well as see a demonstration of what you can do with this library, go to the Examples and Demo site @ [https://formio.github.io/formio.js](https://formio.github.io/formio.js)
 
## Installation
To install this SDK into your project, you can use the following command within your terminal.

```
npm install --save formiojs
```
 
## Form Building
This library has a very powerful JSON form builder, and can be used like the following.

```html
<html>
  <head>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://unpkg.com/formiojs@latest/dist/formio.full.min.css'>
    <script src='https://unpkg.com/formiojs@latest/dist/formio.full.min.js'></script>
    <script type='text/javascript'>
      window.onload = function() {
        Formio.builder(document.getElementById('builder'));
      };
    </script>
  </head>
  <body>
    <div id='builder'></div>
  </body>
</html>
```

This will create a robust Form builder embedded right within your own application. See [Our Demo Page](https://formio.github.io/formio.js/app/builder) for an example.
 
## Form Rendering
The following is a simple example on how to render a form within your HTML application.

```html
<html>
  <head>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://unpkg.com/formiojs@latest/dist/formio.full.min.css'>
    <script src='https://unpkg.com/formiojs@latest/dist/formio.full.min.js'></script>
    <script type='text/javascript'>
      window.onload = function() {
        Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
      };
    </script>
  </head>
  <body>
    <div id='formio'></div>
  </body>
</html>
```

This will render the following form within your application.

![Alt text](https://monosnap.com/file/iOZ1yB0wPntJLWQwyhdt7ucToLHEfF.png)

You can also render JSON directly instead of referencing the embed URL from Form.io.

```js
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
});
```

This will render the JSON schema of the form within your application.

## JSFiddle
A great way to play around with this renderer is to use JSFiddle, which serves as a good sandbox environment. Here is an example that you can fork and make your own!

http://jsfiddle.net/travistidwell/v38du9y1/

## Wizard Rendering
This library can also be used to render a form wizard within your application using the same method as rendering a form.
The determiniation on whether it should render as a wizard or not is based on the **display** property of the form schema 
being set to ```wizard```.

```html
<html>
  <head>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://unpkg.com/formiojs@latest/dist/formio.full.min.css'>
    <script src='https://unpkg.com/formiojs@latest/dist/formio.full.min.js'></script>
    <script type='text/javascript'>
      window.onload = function() {
        Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/wizard');
      };
    </script>
  </head>
  <body>
    <div id='formio'></div>
  </body>
</html>
```

## Form Embedding
You can also use this library as a JavaScript embedding of the form using a single line of code. For example, to embed the https://examples.form.io/example form within your application you can simply use the following embed code.

```html
<script src="https://unpkg.com/formiojs@latest/dist/formio.embed.min.js?src=https://examples.form.io/example"></script>
```

For an example of how this looks and works, check out the following [Form.io Form Embedding CodePen](http://codepen.io/travist/pen/ggQOBa)

## Full Form Renderer Documentation
For a more complete documentation of how to utilize this library within your application go to the [Form Renderer](https://github.com/formio/formio.js/wiki/Form-Renderer) documentation within the [Wiki](https://github.com/formio/formio.js/wiki)

# JavaScript SDK
In addition to having a Form Renderer within this application, you can also use this library as a JavaScript SDK in your application. For example, to load a Form, and then submit that form you could do the following within your JavaScript.

```html
<html>
  <head>
    <script src='https://unpkg.com/formiojs@latest/dist/formio.min.js'></script>
    <script type='text/javascript'>
      var formio = new Formio('https://examples.form.io/example');
      formio.loadForm().then(function(form) {
      
        // Log the form schema.
        console.log(form);
        
        formio.saveSubmission({data: {
          firstName: 'Joe',
          lastName: 'Smith',
          email: 'joe@example.com'
        }}).then(function(submission) {
        
          // Log the full submission object.
          console.log(submission);
        });
      });
    </script>
  </head>
</html>
```

You can also use this within an ES6 application as follows.

```js
import Formio from 'formiojs';
let formio = new Formio('https://examples.form.io/example');
formio.loadForm((form) => {
  console.log(form);
  formio.saveSubmission({data: {
    firstName: 'Joe',
    lastName: 'Smith',
    email: 'joe@example.com'
  }}).then((submission) => {
    console.log(submission);
  });
});
```

## JavaScript SDK Documentation.
For more complete documentation over the JavaScript SDK, please take a look at the [JavaScript SDK](https://github.com/formio/formio.js/wiki/JavaScript-API) within the [wiki](https://github.com/formio/formio.js/wiki).

## Full Developer API Documentation
To view the full SDK Documentation, go to [Developer SDK Documentation](https://formio.github.io/formio.js/docs/)
