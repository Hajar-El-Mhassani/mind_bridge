import { hashPassword } from "../src/middlewares/hashPassword.js";

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
      image: "/uploads/users/default.jpg",
      date_birth: "1990-05-15",
      password: hashedPasswords[0],
    },
    {
      name: "Arjun Mehta",
      email: "arjun@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1995-05-15",
      password: hashedPasswords[1],
    },
    {
      name: "Lina Park",
      email: "lina@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1992-05-15",
      password: hashedPasswords[2],
    },
    {
      name: "Samir Patel",
      email: "samir@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1991-05-15",
      password: hashedPasswords[3],
    },
    {
      name: "Olivia Brooks",
      email: "olivia@example.com",
      image: "default.jpg",
      date_birth: "1990-05-15",
      password: hashedPasswords[4],
    },
    {
      name: "Rahul Verma",
      email: "rahul@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1989-05-15",
      password: hashedPasswords[5],
    },
    {
      name: "Amina Salah",
      email: "amina@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1988-05-15",
      password: hashedPasswords[6],
    },
    {
      name: "Tomasz Nowak",
      email: "tomasz@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1987-05-15",
      password: hashedPasswords[7],
    },
    {
      name: "Haruto Sato",
      email: "haruto@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1990-05-15",
      password: hashedPasswords[8],
    },
    {
      name: "Sophie Martin",
      email: "sophie@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1991-05-15",
      password: hashedPasswords[9],
    },
    {
      name: "Daniel Kim",
      email: "daniel@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1993-05-15",
      password: hashedPasswords[10],
    },
    {
      name: "Maria Rossi",
      email: "maria@example.com",
      image: "/uploads/users/default.jpg",
      date_birth: "1992-05-15",
      password: hashedPasswords[11],
    },
  ]);
}
