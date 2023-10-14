/** @odoo-module **/

import { Component, tags } from "@odoo/owl";

class Header extends Component {
    static template = tags.xml/*xml*/ `
        <header>
            <h1>Tobacco Metrics Pro</h1>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </nav>
        </header>
    `;
}

// Register the component to be used in the template
odoo.define('header', function (require) {
    return Header;
});
