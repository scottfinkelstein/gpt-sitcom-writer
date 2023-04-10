export const changeStep = (btn) => {
    const steps = Array.from(document.querySelectorAll('.step'))
    let index = 0;

    const active = document.querySelector('.step.active')
    index = steps.indexOf(active)
    steps[index].classList.remove('active')

    if (btn === 'next') {
        index++
    }else if (btn === 'prev') {
        index--
    }
    steps[index].classList.add('active')
}
