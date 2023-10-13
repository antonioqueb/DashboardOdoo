/** @odoo-module **/

import { Component, tags } from "@odoo/owl";
import { registry } from "@odoo/owl";

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

//Register the component to be used in the template
odoo.define('tobaccometricspro.header', function (require) {
    registry.category("actions").add("tobaccometricspro_header", Header); // Registering the action
    return Header;
});
