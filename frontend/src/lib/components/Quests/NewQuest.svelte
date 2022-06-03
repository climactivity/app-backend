<form
  class="w-full max-w-2xl px-6 py-8 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
>
  <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">
    Neue Aufgabe erstellen
  </h2>
  <p class="mt-3 text-center text-gray-600 dark:text-gray-400">
   Hier kannst du eine neue Aufgabe erstellen.
  </p>

  <div class="mt-6 ">
    <div class="items-center -mx-2 md:flex">
      <div class="w-full mx-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          >Aufgabe Title</label
        >

        <input
          class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          type="text"
        />
      </div>

      <div class="w-full mx-2 mt-4 md:mt-0">
        <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          >Aufgabe Aspek</label
        >

        <input
          class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          type="email"
        />
      </div>
    </div>

    <div class="w-full mt-4">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label
        class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
        >Aufgabe Inhalt</label
      >

      <textarea
        class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
      />
    </div>

    <div class="flex justify-center mt-6">
      <button
        type="submit"
        class="px-4 py-2 text-white transition-colors duration-200 transform bg-blue-800 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-900"
        >Speichern</button
      >
    </div>
  </div>
</form>
