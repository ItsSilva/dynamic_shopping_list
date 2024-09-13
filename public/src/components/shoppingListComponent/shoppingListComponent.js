import ShoppingItem from "../shoppingItemComponent/shoppingItemComponent.JS";
import shoppingData from "../../data/ShoppingData.js";
class ShoppingList extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.articles = [];
    };
    connectedCallback(){
        this.render();

        const form = this.shadowRoot.querySelector('.form-container');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = this.shadowRoot.querySelector('.input-name').value;
            const quantity = this.shadowRoot.querySelector('.input-quantity').value;

            // this.articles.push({name: name, quantity: quantity, delete: false});
            this.addArticle({name: name, quantity: quantity, delete: false});

            form.reset();
        })
    };
    addArticle({ name, quantity, delete: deleteArticle }) {
        const article = document.createElement('shopping-item');
        article.setAttribute('name', name);
        article.setAttribute('quantity', quantity);
        article.setAttribute('delete', deleteArticle);

        this.shadowRoot.querySelector('.article-list').appendChild(article);
    }
    render(){
        this.shadowRoot.innerHTML = `
        <form class='form-container'>
        <input class='input-name' type='text' placeholder='Enter the Item Name' required>
        <input class='input-quantity' type='number' placeholder='Enter the Quantity' required>
        <button>Add new Article</button>
        </form>
        <ul class='article-list'></ul>
        `;
        shoppingData.forEach(article => this.addArticle(article));
        // this.articles.forEach(article => this.addArticle(article));
    };
};
customElements.define('shopping-list', ShoppingList);
export default ShoppingList;