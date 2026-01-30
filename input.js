// pushing element to js
var title = document.getElementById("title")
var desc = document.getElementById("desc")
var buggy = document.getElementById("bug")
var user = document.getElementById("user")
var easyBtn = document.getElementById("easyBtn")
var mediumBtn = document.getElementById("mediumBtn")
var hardBtn = document.getElementById("hardBtn")

var currentLevel = ""
var currentQuestionIndex = 0

//Questions 

var questions = {
  easy: [
    {
      title: "Easy Level – Fix the Syntax (Q1)",
      desc: "Make this run without errors",
      code: 'console.log("Hello World";'
    },
    {
      title: "Easy Level – Missing Bracket (Q2)",
      desc: "Fix the syntax error",
      code: 'if(true){\n  console.log("Hi")\n'
    },
    {
      title: "Easy Level – Variable Error (Q3)",
      desc: "Fix the variable declaration",
      code: 'x = 10;\nconsole.log(x);'
    }
  ],

  medium: [
    {
      title: "Medium Level – Fix the Logic (Q1)",
      desc: "Correct the condition",
      code:
        'let num=4;\nif(num%2==1){\n  console.log("Even");\n}else{\n  console.log("Odd");\n}'
    },
    {
      title: "Medium Level – Loop Issue (Q2)",
      desc: "Fix the loop condition",
      code:
        'for(let i=0;i>5;i++){\n  console.log(i);\n}'
    },
    {
      title: "Medium Level – Comparison Bug (Q3)",
      desc: "Fix the comparison operator",
      code:
        'let a=5;\nif(a=10){\n  console.log("Ten");\n}'
    }
  ],

  hard: [
    {
      title: "Hard Level – Fix the Function (Q1)",
      desc: "Ensure the function returns value",
      code:
        'function square(n){\n  n*n;\n}\nconsole.log(square(4));'
    },
    {
      title: "Hard Level – Callback Error (Q2)",
      desc: "Fix the function call",
      code:
        'setTimeout(function(){\n  console.log("Done")\n}, );'
    },
    {
      title: "Hard Level – Scope Issue (Q3)",
      desc: "Fix the scope problem",
      code:
        'function test(){\n  let x=5;\n}\nconsole.log(x);'
    }
  ]
}

//reset button style 

function resetButtons() {
  easyBtn.className = "w-24 py-2 rounded-lg bg-gray-200 text-black"
  mediumBtn.className = "w-24 py-2 rounded-lg bg-gray-200 text-black"
  hardBtn.className = "w-24 py-2 rounded-lg bg-gray-200 text-black"
}

// loading the questions

function loadQuestion() {
  var q = questions[currentLevel][currentQuestionIndex]
  title.innerHTML = q.title
  desc.innerHTML = q.desc
  buggy.value = q.code
  user.value = ""
}

// medium of levels

easyBtn.onclick = function () {
  resetButtons()
  easyBtn.className = "w-24 py-2 rounded-lg bg-green-400 text-white font-bold"
  currentLevel = "easy"
  currentQuestionIndex = 0
  loadQuestion()
}

mediumBtn.onclick = function () {
  resetButtons()
  mediumBtn.className = "w-24 py-2 rounded-lg bg-green-400 text-white font-bold"
  currentLevel = "medium"
  currentQuestionIndex = 0
  loadQuestion()
}

hardBtn.onclick = function () {
  resetButtons()
  hardBtn.className = "w-24 py-2 rounded-lg bg-green-400 text-white font-bold"
  currentLevel = "hard"
  currentQuestionIndex = 0
  loadQuestion()
}

// reset button

document.getElementById("reset").onclick = function () {
  user.value = ""
}

// run button

document.getElementById("run").onclick = function () {
  if (user.value.trim() === "") {
    alert("Please write some code first!")
  } else if (user.value === buggy.value) {
    alert("You haven't fixed anything!")
  } else {
    alert("Code runs without errors!")
  }
}

//submit button

document.getElementById("submit").onclick = function () {
  if (user.value.trim() === "") {
    alert("Cannot submit empty code!")
    return
  }

  if (user.value === buggy.value) {
    alert("Please fix the code before submitting!")
    return
  }

  currentQuestionIndex++

  if (currentQuestionIndex < questions[currentLevel].length) {
    alert("Correct! Moving to next question 🚀")
    loadQuestion()
  } else {
    alert("🎉 Level Completed!")
    user.value = ""
  }
}
