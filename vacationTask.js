const releaseDayOnTheCalendar = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
const durationOfVacation = 3;

function findDayoffs(dauratation, calendar, index = 0, combinationQuantity = 0, daysWithoutReleases = 0){
    if (calendar[index] === 0){
        daysWithoutReleases ++
    } 
    else if(calendar[index] === 1){
        daysWithoutReleases = 0
    }
    if(daysWithoutReleases >= dauratation){
        combinationQuantity++
    }
    if(index <= calendar.length - 2){
        return findDayoffs(dauratation, calendar, ++index, combinationQuantity, daysWithoutReleases)
    }else{
        return combinationQuantity
    }
}

const combination = findDayoffs(durationOfVacation, releaseDayOnTheCalendar)
console.log(combination)