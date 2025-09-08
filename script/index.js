const loadLessons = () => {
   fetch('https://openapi.programming-hero.com/api/levels/all')
      .then(res => res.json())
      .then(output => displayLesson(output.data));
}


const displayLesson = (lessons) => {
   // 1. get the container and clear the container
   const levelContainer = document.getElementById("level-container");
   levelContainer.innerHTML = "";

   // 2. get into every lessons
   for (let lesson of lessons) {

      // 3. create element
      const btnDiv = document.createElement("div");
      btnDiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
         `

      // 4. append into container
      levelContainer.append(btnDiv);
   }
};


const loadLevelWord = (id) => {
   const url = `https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
      .then(res => res.json())
      .then(output => displayLevelWord(output.data));
}



// {
//    "id": 4,
//    "level": 5,
//    "word": "Diligent",
//    "meaning": "পরিশ্রমী",
//    "pronunciation": "ডিলিজেন্ট"
//    }



const displayLevelWord = (words) => {
   const wordContainer = document.getElementById("word-container");
   wordContainer.innerHTML = "";


   if (words.length == 0) {
      wordContainer.innerHTML = `
      <div class="mx-auto text-center col-span-full rounded-xl py-10">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <h4 class="text-xl font-medium text-gray-500 py-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h4>
      <h2 class="text-5xl font-medium py-5">নেক্সট Lesson এ যান</h2>
   </div>
      `
   }

   words.forEach(word => {
      const card = document.createElement("div");
      card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
      <h2 class="font-bold text-3xl">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
      <p class="font-semibold text-">Meaning / Pronounciation</p>
      <div class="text-3xl font-medium font-bangla text-[18181B]">${word.meaning ? word.meaning : "শব্দ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "শব্দ পাওয়া যায় নি"}</div>
      <div class="flex justify-between items-center">
         <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
         <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
   </div>
      `;

      wordContainer.append(card);
   });
}


loadLessons();
