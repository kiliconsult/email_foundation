# Email Foundation

A stack for making responsive emails fast and accurate.

Write your email like 

```html
<row>
	<columns small="12" large="6">...</columns>
	<columns small="12" large="6">...</columns>
</row>
```
And in only one step transform it to this hellish looking thing

```html
<table class="row"
       style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
    <tbody>
    <tr style="padding: 0; text-align: left; vertical-align: top;">
        <th class="small-12 large-6 columns first"
            style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 26px; margin: 0 auto; padding: 0; padding-bottom: 0; padding-left: 16px; padding-right: 8px; text-align: left; width: 584px;">
            <table style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <th style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 26px; margin: 0; padding: 0; text-align: left;">
                        ...
                    </th>
                </tr>
            </table>
        </th>
        <th class="small-12 large-6 columns last"
            style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 26px; margin: 0 auto; padding: 0; padding-bottom: 0; padding-left: 8px; padding-right: 16px; text-align: left; width: 584px;">
            <table style="border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
                <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <th style="Margin: 0; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 26px; margin: 0; padding: 0; text-align: left;">
                        ...
                    </th>
                </tr>
            </table>
        </th>
    </tr>
    </tbody>
</table>
```

I hope you can see the point.

### Installation

You need [node] and [npm] installed.  
*NOTE: Use Node version 5+


##### Project initialization
You need Gulp installed globally:

```sh
$ sudo npm i -g gulp
```

```sh
$ git clone [git-repo-url] emails
$ cd emails
$ npm i -d
```

And compile templates by running gulp

```sh
$ gulp
```

### Tech

We use a number of open source projects to work properly:

* [foundation email css] - Responsive email css-framework
* [inky] - Templating language for email
* [panini] - Flat file templating
* [gulp] - the streaming build system
* [sass] - Css with superpowers


### Structure
* [/email] - Contains the important stuff
  * [/scss] - Sass files
  * [/pages] - The pages that is compiled
  * [/layout] - Every page will inherit the layout
  * [/partials] - Reusable components
* [/dist] - Compiled templates 


### Testing emails
With emails it is not enough to just look at the email in your browser. You need to see the email opened in every supported 
email client. See https://emailclientmarketshare.com/ to get an overview of which clients is used the most. 
 
Either install all clients yourself (In all versions) or use a tool like https://litmus.com/ to test your email fast.