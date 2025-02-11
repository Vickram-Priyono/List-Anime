const animeContainer = document.createElement("div");
animeContainer.id = "animeContainer"; // Pastikan ID sesuai dengan CSS
document.body.appendChild(animeContainer);

const form = document.querySelector("#carianime");

form.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const inputValue = document.querySelector("#judul").value.trim();
    const inputNumberValue = document
      .querySelector('input[type="number"]')
      .value.trim();

    if (inputNumberValue === "") {
      alert("Input number tidak bisa kosong");
      submitButton.disabled = false;
      return;
    } else if (inputNumberValue > 25) {
      alert("Input number tidak bisa lebih dari 25");
      submitButton.disabled = false;
      return;
    }

    if (animeContainer.childElementCount > 0) {
      animeContainer.innerHTML = "";
    }

    await getAnime(inputValue, inputNumberValue);
  } catch (err) {
    console.log(err);
  } finally {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = false;
  }
});

const getAnime = async (q, limit = 5) => {
  try {
    const get = await axios.get(
      `https://api.jikan.moe/v4/anime/?q=${q}&limit=${limit}`
    );
    get.data.data.forEach((element) => {
      const title = element.title;
      const animeChild = document.createElement("a");
      const icon = document.createElement("img");
      icon.setAttribute("src", element.images.webp.image_url);

      // Tambahkan div wrapper
      const animeItem = document.createElement("div");
      animeItem.classList.add("anime-item");

      animeChild.textContent = title;
      animeChild.href = element.url;
      animeChild.classList.add("test");
      animeChild.setAttribute("target", "_blank");

      // Masukkan elemen ke dalam wrapper
      animeItem.appendChild(animeChild);
      animeChild.appendChild(icon);
      animeContainer.appendChild(animeItem); // Tambahkan wrapper ke container
      console.log(element);
    });
  } catch (err) {
    alert(err.response.data.messages.limit[0]);
  }
};
