async function getStudent() {
  const matric = document.getElementById('matric').value;
  const response = await fetch(`/student/${matric}`);
  const student = await response.json();

  if (response.ok) {
    document.getElementById('studentInfo').innerText = JSON.stringify(student, null, 2);
  } else {
     document.getElementById('studentInfo').innerText = student.message;
  }
}