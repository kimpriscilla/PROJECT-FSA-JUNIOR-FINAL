const Sequelize = require("sequelize");
const { STRING, DECIMAL, TEXT } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/jpfp"
);
const faker = require("faker");
//console.log(faker.lorem.paragraph);

const Campuses = db.define("campus", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: STRING,
    allowNull: true,
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
  },
});

const Students = db.define("student", {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: STRING,
    allowNull: true,
  },
  gpa: {
    type: DECIMAL,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

const campusData = [
  {
    name: "Teta",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Dartmouth_College_campus_2007-10-20_09.JPG/800px-Dartmouth_College_campus_2007-10-20_09.JPG",
    address: "13456778 Driveway",
    description: faker.lorem.paragraphs(),
  },
  {
    name: "Hello World",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Dartmouth_College_campus_2007-10-20_09.JPG/800px-Dartmouth_College_campus_2007-10-20_09.JPG",
    address: "13456778 Driveway",
    address: "188262 TurnPike",
    description: faker.lorem.paragraphs(),
  },
  {
    name: "Never Land",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Dartmouth_College_campus_2007-10-20_09.JPG/800px-Dartmouth_College_campus_2007-10-20_09.JPG",
    address: "13456778 Driveway",
    address: "123447 Highway",
    description: faker.lorem.paragraphs(),
  },
  {
    name: "Data Deck ",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Dartmouth_College_campus_2007-10-20_09.JPG/800px-Dartmouth_College_campus_2007-10-20_09.JPG",
    address: "13456778 Driveway",
    address: "777 Nabi Ave",
    description: faker.lorem.paragraphs(),
  },
];

const studentData = [
  {
    firstName: "Priscilla",
    lastName: "Kim",
    email: "hello123@yahoo.com",
    imageUrl:
      "https://www.clipartmax.com/png/middle/232-2325061_spongebob-squarepants-characters-fish.png",
    gpa: 3.8,
  },
  {
    firstName: "Nick",
    lastName: "Brewer",
    email: "nickb134@gmail.com",
    imageUrl:
      "https://i.etsystatic.com/15568096/r/il/e1ced4/2010945485/il_794xN.2010945485_a6x4.jpg",
    gpa: 3.5,
  },
  {
    firstName: "Ada",
    lastName: "Cook",
    email: "avacooks124@gmail.com",
    imageUrl:
      "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
    gpa: 2.5,
  },
  {
    firstName: "Sal",
    lastName: "Walker",
    email: "sally777@gmail.com",
    imageUrl:
      "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
    gpa: 3.2,
  },
];

Students.belongsTo(Campuses);
Campuses.hasMany(Students);

const syncAndSeed = async () => {
  await db.sync({ force: true });

  campusData.forEach(async (el) => {
    await Campuses.create({
      name: el.name,
      imageUrl: el.imageUrl,
      address: el.address,
      description: el.description,
    });
  });

  const [Priscilla, Nick, Sal, Ada] = await Promise.all(
    studentData.map((el) =>
      Students.create({
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email,
        imageUrl: el.imageUrl,
        gpa: el.gpa,
      })
    )
  );
  Priscilla.campusId = 1;
  Nick.campusId = 2;
  Sal.campusId = 2;
  Ada.campusId = 3;
  Priscilla.save();
  Nick.save();
  Sal.save();
  Ada.save();
  /*
  await Promise.all(
    studentData.map((student) =>
      student.update({ campusId: Math.floor(Math.random() * 3) })
    )
  );
  */
};

module.exports = {
  syncAndSeed,
  models: {
    Campuses,
    Students,
  },
};
