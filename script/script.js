const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then(res => res.json()) // promise json
    .then(json => displayLesson(json.data))
    
}

const loadLevelWord = (id) =>{
    // console.log(id);
    const  url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => displyLevelWord(data.data))
}


const displyLevelWord = (words) =>{
    console.log(words);
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";

    words.forEach(element => {
        const card = document.createElement("div");
        card.innerHTML = `
            <p>Cat</p>
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
            onclick="loadLevelWord(${lesson.level_no})"
            class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>${lesson.lessonName}</
        button>
        `;
    // 4. append into container
    levelConatiner.append(btndiv);
    }

}

loadLessons();