const createElements = (arr) =>{
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};

const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then(res => res.json()) // promise json
    .then(json => displayLesson(json.data))
    
}

const removeActive = () =>{
    const lessonButton = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButton);
    lessonButton.forEach(btn=> btn.classList.remove("active"))
    
}

const loadLevelWord = (id) =>{
    // console.log(id);
    const  url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn);
        // add active class using js
        clickBtn.classList.add("active")
        
        displyLevelWord(data.data);
    })
}

const loadWordDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
//data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
    
}

const displayWordDetails = (word) =>{
    console.log(word)
    const detialsBox = document.getElementById("details-container");
    detialsBox.innerHTML = `
        <div class="">
            <h2 class="text-4xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold font-bangla">সমার্থক শব্দ গুলো</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
    `;
    document.getElementById("word_details_modal").showModal();

}

const displyLevelWord = (words) =>{
    console.log(words);
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `      
        <div class="text-center col-span-full py-10 space-y-4">
            <img class="mx-auto" src="./assets/alert-error.png"/>
             <i class="fa-solid fa-triangle-exclamation text-8xl text-gray-400"></i>
            <p class="text-xl font-medium text-gray-400 font-bangla">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>`;
        return;
    }
// {id: 5, level: 1, word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার'}

    words.forEach(element => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card bg-base-100 card-lg shadow-sm">
            <div class="card-body text-center space-y-4">
                <h2 class="card-title text-2xl font-bold mx-auto">${element.word ? element.word:"শব্দ পাওয়া যায় নি।"}</h2>
                <p class="font-semibold">
                    Meaning /Pronounciation
                </p>
                <p class="text-2xl font-medium font-bangla">"${element.meaning ? element.meaning:"অর্থ পাওয়া যায়নি"} / ${element.pronunciation ? element.pronunciation:"Pronounciation পাওয়া যায়নি।"}"</p>
                <div class="flex justify-between card-actions">
                    <button onclick="loadWordDetails(${element.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        </div>
        `
        wordContainer.append(card)
    });
    
}

const displayLesson = (lessons) =>{
    console.log(lessons)
    // 1. get the container & empty.
    const levelConatiner = document.getElementById("level-container");
    levelConatiner.innerHTML = "";

    // 2. get into every lessons
    for(let lesson of lessons){
        const btndiv = document.createElement("div");
            // 3. create Element
        btndiv.innerHTML = `
        <button
            id="lesson-btn-${lesson.level_no}"
            onclick="loadLevelWord(${lesson.level_no})"
            class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>${lesson.lessonName}</
        button>
        `;
    // 4. append into container
    levelConatiner.append(btndiv);
    }

}

loadLessons();