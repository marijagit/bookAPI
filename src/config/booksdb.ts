import { Book } from '../models/book.js';

let books: Record<number, Book> = {
      1: {
            author: "Chinua Achebe",
            title: "Things Fall Apart",
            reviews: {
                  marija: "A powerful exploration of colonial impact on Igbo society.",
                  mari: "Achebe’s prose is both poetic and deeply moving."
            }
      },
      2: {
            author: "Hans Christian Andersen",
            title: "Fairy tales",
            reviews: {
                  ana: "Timeless stories that shaped childhood imagination.",
                  b: "Some tales are darker than expected, but beautifully written."
            }
      },
      3: {
            author: "Dante Alighieri",
            title: "The Divine Comedy",
            reviews: {}
      },
      4: {
            author: "Unknown",
            title: "The Epic Of Gilgamesh",
            reviews: {
                  a: "One of the earliest surviving works of literature.",
                  b: "Themes of friendship and mortality remain relevant today."
            }
      },
      5: {
            author: "Unknown",
            title: "The Book Of Job",
            reviews: {
                  a: "A profound meditation on suffering and faith.",
                  b: "Philosophically rich, though challenging in style."
            }
      },
      6: {
            author: "Unknown",
            title: "One Thousand and One Nights",
            reviews: {
                  a: "Captivating tales within tales — Scheherazade’s storytelling is legendary.",
                  b: "A treasure trove of Middle Eastern folklore."
            }
      },
      7: {
            author: "Unknown",
            title: "Njál's Saga",
            reviews: {
                  a: "A gripping Icelandic saga full of honor and vengeance.",
                  b: "Surprisingly modern themes of law and justice."
            }
      },
      8: {
            author: "Jane Austen",
            title: "Pride and Prejudice",
            reviews: {
                  a: "Sharp social commentary wrapped in romance.",
                  b: "Elizabeth Bennet is one of literature’s most enduring heroines."
            }
      },
      9: {
            author: "Honoré de Balzac",
            title: "Le Père Goriot",
            reviews: {
                  a: "A tragic tale of parental sacrifice and ambition.",
                  b: "Balzac’s Paris feels alive with intrigue and corruption."
            }
      },
      10: {
            author: "Samuel Beckett",
            title: "Molloy, Malone Dies, The Unnamable, the trilogy",
            reviews: {
                  a: "Bleak yet brilliant — Beckett pushes the boundaries of narrative.",
                  b: "Not easy reading, but profoundly existential."
            }
      }
};

export { books };

