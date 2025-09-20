import { hashPassword } from "../src/utils/password.js";

export async function seed(knex) {
  // Clear dependent tables first
  await knex("lessons").del();
  await knex("courses").del();
  await knex("users").del();

  // Plain passwords (each user gets a unique one)
  const plainPasswords = [
    "jane123",
    "arjun123",
    "lina123",
    "samir123",
    "olivia123",
    "rahul123",
    "amina123",
    "tomasz123",
    "haruto123",
    "sophie123",
    "daniel123",
    "maria123",
  ];

  // Hash all passwords
  const hashedPasswords = await Promise.all(
    plainPasswords.map((pwd) => hashPassword(pwd))
  );

  // Insert users
  await knex("users").insert([
    {
      name: "Jane Doe",
      email: "jane@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758333354/Screenshot_2025-09-18_210426_gkeg8c.png",
      date_of_birth: "1990-05-15",
      password: hashedPasswords[0],
    },
    {
      name: "Arjun Mehta",
      email: "arjun@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758333669/1705780663044_ukv0ar.jpg",
      date_of_birth: "1995-05-15",
      password: hashedPasswords[1],
    },
    {
      name: "Lina Park",
      email: "lina@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758333354/Screenshot_2025-09-18_210426_gkeg8c.png",
      date_of_birth: "1992-05-15",
      password: hashedPasswords[2],
    },
    {
      name: "Samir Patel",
      email: "samir@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
      date_of_birth: "1991-05-15",
      password: hashedPasswords[3],
    },
    {
      name: "Olivia Brooks",
      email: "olivia@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
      date_of_birth: "1990-05-15",
      password: hashedPasswords[4],
    },
    {
      name: "Rahul Verma",
      email: "rahul@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
      date_of_birth: "1989-05-15",
      password: hashedPasswords[5],
    },
    {
      name: "Amina Salah",
      email: "amina@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
      date_of_birth: "1988-05-15",
      password: hashedPasswords[6],
    },
    {
      name: "Tomasz Nowak",
      email: "tomasz@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
      date_of_birth: "1987-05-15",
      password: hashedPasswords[7],
    },
    {
      name: "Haruto Sato",
      email: "haruto@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
      date_of_birth: "1990-05-15",
      password: hashedPasswords[8],
    },
    {
      name: "Sophie Martin",
      email: "sophie@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
      date_of_birth: "1991-05-15",
      password: hashedPasswords[9],
    },
    {
      name: "Daniel Kim",
      email: "daniel@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
      date_of_birth: "1993-05-15",
      password: hashedPasswords[10],
    },
    {
      name: "Maria Rossi",
      email: "maria@example.com",
      image:
        "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg",
      date_of_birth: "1992-05-15",
      password: hashedPasswords[11],
    },
  ]);
}
