import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

const ANIMALS = [
  "cat",
  "dog",
  "hamster",
  "rabbit",
  "fox",
  "bear",
  "lion",
  "tiger",
];
const OBJECTS = [
  "chair",
  "table",
  "lamp",
  "desk",
  "book",
  "phone",
  "cup",
  "pen",
];
const STORAGE_KEY = "username";

const generateUsername = () => {
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const object = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
  return `${animal}-${object}-${nanoid(5)}`;
};

export const useUsername = () => {
  const [username, setUsername] = useState("")

  useEffect(() => {
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEY)

      if (stored) {
        setUsername(stored)
        return
      }

      const generated = generateUsername()
      localStorage.setItem(STORAGE_KEY, generated)
      setUsername(generated)
    }

    main()
  }, [])

  return { username }
}