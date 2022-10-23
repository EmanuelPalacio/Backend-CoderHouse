class User {

    constructor(name,surname){
        this.name = name;
        this.surname = surname;
        this.books = [];
        this.pets = [];
    }

    getFullname(){
        console.log(`${this.name} ${this.surname}`)
    }
    addPet(pet){
        this.pets.push(pet)
    }
    countPets(){
        const amount = this.pets.length
        const text = amount > 1 ? `tiene ${amount} mascotas`: 'tiene una sola mascota' ;
        console.log(`${this.name} ${amount === 0 ? 'no tiene mascotas': text}`);
    }
    addBook(book, author){
        this.books.push({book: book, author: author})
    }
    getBooksNames(){
        const arrayNameBooks =  this.books.map((e) => e.book);
        console.log(arrayNameBooks);
    }
}
const user = new User('Jorge', 'Gutierres')
user.getFullname()

user.addPet('Loro');
user.addPet('Collie');
user.countPets();

user.addBook('Viaje al fin de la noche', 'Louis-Ferdinand Céline');
user.addBook('Don Quijote de la Mancha', 'Miguel de Cervantes');
user.addBook('Los cuentos de Canterbury', 'Geoffrey Chaucer');
user.getBooksNames();