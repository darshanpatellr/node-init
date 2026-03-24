let name = "Darshan";
let age = 23;

function showUserDetails(name, age) {
    return "----------------------" +
        "\nName is: " + name +
        "\nAge is: " + age +
        "\nThank You!" +
        "\n----------------------";
}

// console.log(showUserDetails(name, age));

const user = {
    name: "Darshan Patel",
    age: 23,
    address: "Gujarat, India",
    showUserDetails() {
        console.log("Hello " + this.name);
    }
};

// console.log(`User is : ${user.address}`);

const colors = ["Red", "Green", "Blue", "Orange"];
console.log(`Colors Length: ${colors.length}`);
colors.forEach(color => {
    console.log(color);
});

