const STAT = {
  BRAVE: 0,
  HUNGRY: 1,
  KIND: 2,
  TIMID: 3,
  CALM: 4
}
const questions = [
  {
    text: `Question 1`,
    answers: [
      {
        text: `Answer 1`,
        scores: [
          {
            stat: STAT.BRAVE,
            val: 2
          },
          {
            stat: STAT.HUNGRY,
            val: 1
          },
          {
            stat: STAT.TIMID,
            val: -1
          }
        ]
      },
      {
        text: `Answer 2`,
        scores: [
          {
            stat: STAT.HUNGRY,
            val: -1
          },
          {
            stat: STAT.KIND,
            val: 3
          },
          {
            stat: STAT.CALM,
            val: 1
          }
        ]
      }
    ]
  },
  {
    text: `Question 2`,
    answers: [
      {
        text: `Answer 1`,
        scores: [
          {
            stat: STAT.CALM,
            val: -2
          },
          {
            stat: STAT.BRAVE,
            val: 3
          }
        ]
      },
      {
        text: `Answer 2`,
        scores: [
          {
            stat: STAT.BRAVE,
            val: -1
          }
        ]
      },
      {
        text: `Answer 3`,
        scores: [
          {
            stat: STAT.CALM,
            val: 3
          }
        ]
      }
    ]
  },
  {
    text: `Question 3`,
    answers: [
      {
        text: `Answer 1`,
        scores: [
          {
            stat: STAT.BRAVE,
            val: 3
          }
        ]
      },
      {
        text: `Answer 2`,
        scores: [
          {
            stat: STAT.BRAVE,
            val: 1
          }
        ]
      },
      {
        text: `Answer 3`,
        scores: []
      },
      {
        text: `Answer 4`,
        scores: [
          {
            stat: STAT.TIMID,
            val: 1
          }
        ]
      },
      {
        text: `Answer 5`,
        scores: [
          {
            stat: STAT.TIMID,
            val: 3
          }
        ]
      }
    ]
  }
]

let stats = [0, 0, 0, 0, 0]

const createQuiz = () => {
  let quizInnerHTML = ''
  questions.forEach((question, i) => {
    quizInnerHTML += `<li><h1>${question.text}</h1>`
    question.answers.forEach((answer, j) => {
      quizInnerHTML += `<input type="radio" id="q${i}a${j}" name="q${i}" data-question="${i}" value="${j}">
                            <label for="q${i}a${j}">${answer.text}</label>`
    })
    quizInnerHTML += `</li>`
  })

  quizInnerHTML += `<li>
                          <h1>Submit Answers?</h1>
                          <button type=button class="submit">Submit</button>
                        </li>`
  document.getElementById('quiz').innerHTML = quizInnerHTML
}

document.addEventListener('click', (event) => {
  let target = event.target
  if (target.classList.contains('submit')) {
    stats = [0, 0, 0, 0, 0]
    questions.forEach((question, i) => {
      let radios = document.getElementsByName(`q${i}`)
      let len = radios.length
      for (let j = 0; j < len; j++) {
        if (radios[j].checked) {
          question.answers[j].scores.forEach(score => {
            stats[score.stat] += score.val
          })
        }
      }
    })

    document.getElementById('score').innerHTML = `<p>Stat 1: ${stats[0]}</p>
                                                      <p>Stat 2: ${stats[1]}</p>
                                                      <p>Stat 3: ${stats[2]}</p>
                                                      <p>Stat 4: ${stats[3]}</p>
                                                      <p>Stat 5: ${stats[4]}</p>`
  }
})

createQuiz()