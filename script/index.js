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

   words.forEach(word => {
      const card = document.createElement("div");
      card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
      <h2 class="font-bold text-3xl">${word.word}</h2>
      <p class="font-semibold text-">${word.meaning}</p>
      <div class="text-3xl font-medium font-bangla text-[18181B]">${word.pronunciation}</div>
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
