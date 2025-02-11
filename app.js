const animeContainer = document.createElement(`div`);
document.body.appendChild(animeContainer);

const form = document.querySelector(`#carianime`);

form.addEventListener(`submit`, async function (event) {
  try {
    event.preventDefault(); // Mencegah form submit default

    const submitButton = form.querySelector(`button[type="submit"]`);
    submitButton.disabled = true; // Menonaktifkan tombol submit

    const inputValue = document.querySelector(`#judul`).value.trim();
    const inputNumberValue = document
      .querySelector(`input[type="number"]`)
      .value.trim();

    if (inputNumberValue === ``) {
      alert(`input number tidak bisa kosong`);
      submitButton.disabled = false; // Mengaktifkan kembali tombol submit
      return;
    } else if (inputNumberValue > 25) {
      alert(`input number tidak bisa lebih dari 25`);
      submitButton.disabled = false; // Mengaktifkan kembali tombol submit
      return;
    }

    if (animeContainer.childElementCount > 0) {
      animeContainer.innerHTML = ``;
    }

    await getAnime(inputValue, inputNumberValue); // Menunggu proses getAnime selesai
  } catch (err) {
    console.log(err);
  } finally {
    const submitButton = form.querySelector(`button[type="submit"]`);
    submitButton.disabled = false; // Mengaktifkan kembali tombol submit setelah proses selesai
  }
});

const getAnime = async (q, limit = 5) => {
  try {
    const get = await axios.get(
      `https://api.jikan.moe/v4/anime/?q=${q}&limit=${limit}`
    );
    get.data.data.forEach((element) => {
      const title = element.title;
      const animeChild = document.createElement(`a`);
      animeChild.textContent = title;
      animeChild.href = element.url;
      animeChild.classList.add(`test`);
      animeChild.setAttribute(`target`, `_blank`);
      animeContainer.appendChild(animeChild);
      console.log(element.url);
    });
  } catch (err) {
    alert(err.response.data.messages.limit[0]);
  }
};
