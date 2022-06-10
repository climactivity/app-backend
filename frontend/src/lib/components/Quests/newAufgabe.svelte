<script>
  import { baseUrl } from "$lib/stores/stores";
  const values = {
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${baseUrl}quest-management?${new URLSearchParams({
        r: "DE",
        l: "DE",
      })}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setStore({ ...values, [name]: value });
  };
</script>

<h1 class="text-2xl text-center">Aufgabe erstellen</h1>
<form onSubmit={handleSubmit} class="form">
  <div class="grid">
    <div>
      <label for="name">Event Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={values.name}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label for="performers">Performers</label>
      <input
        type="text"
        name="performers"
        id="performers"
        value={values.performers}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label for="venue">Venue</label>
      <input
        type="text"
        name="venue"
        id="venue"
        value={values.venue}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label for="address">Address</label>
      <input
        type="text"
        name="address"
        id="address"
        value={values.address}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label for="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        value={values.date}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label for="time">Time</label>
      <input
        type="text"
        name="time"
        id="time"
        value={values.time}
        onChange={handleInputChange}
      />
    </div>
  </div>

  <div>
    <label for="description">Event Description</label>
    <textarea
      type="text"
      name="description"
      id="description"
      value={values.description}
      onChange={handleInputChange}
    />
  </div>

  <input type="submit" value="Save Quest" class="py-2 px-4  bg-gradient-to-l from-green-400 to-blue-500 text-white w-full transition ease-in duration-400 text-center text-base font-semibold shadow-xl rounded   hover:to-blue-700 " />
</form>



<style>
  .form label {
    display: block;
  }

  .form input {
    width: 100%;
    height: 40px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .form textarea {
    width: 100%;
    height: 150px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  /* .form input[type="submit"] {
    display: block;
    width: 100%;
    margin: 20px 0 30px;
  } */

  /* .form .file {
    border: 1px rgb(117, 114, 114) solid;
    background-color: #787373;
    padding: 10px;
  } */

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
