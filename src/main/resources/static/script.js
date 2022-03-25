let selectBrand = $('#brand');
let selectModel = $('#model');
let selectModification = $('#modification');
let selectEquipment = $('#equipment');

let countNameplate = 0;
let sumOrder = 0;
let isSaddle = false;
let jumper = 0;
let row3 = 0;
let trunk = 0;
let mounts = 0;
let saddle = 0;

let materialCoefficient;
let modificationCoefficient;
let priceEquipment;


let equipmentList;
let modificationList;
let additionList;
let materiaList;

let material = 'eva';

console.log('hi script!');

initialize();

//обработчик изменения списка брендов
selectBrand.change(function (event) {
    if ($('#brand option:selected').text() !== 'Выберите марку') {
        $.ajax({
            url: '/modelcar/'+$('#brand option:selected').val(),
            method: 'GET',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success: function (modellist) {
                selectModel.empty();
                selectModel.append('<option>Выберите модель</option>');
                selectModification.empty();
                selectModification.append('<option>Выберите модификацию</option>');
                selectModification.prop('disabled', true);
                clear();

                for(let i = 0; i < modellist.length; i++){
                    selectModel.append('<option value="'+ modellist[i].id +'">'+ modellist[i].name +'</option>');
                }
            },
            error: function(xhr, status, error){
                let errorMessage = xhr.status + ': ' + xhr.statusText;
                alert('Error - ' + errorMessage);
            }
        })

        selectModel.prop('disabled', false);

    } else {
        selectModel.prop('disabled', true);
        $('#model option:first').prop('selected', true);
        selectModification.prop('disabled', true);
        $('#modification option:first').prop('selected', true);
        countNameplate = 0;
        $('#countNameplate').text(countNameplate);
        clear();

    }

})

//обработчик изменения списка моделей
selectModel.change(function (event) {
    if ($('#model option:selected').text() !== 'Выберите модель') {
        // запрос в базу на получение списка модификаций
        $.ajax({
            url: '/modification/'+$('#model option:selected').val(),
            method: 'GET',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success: function (modificationlist) {
                selectModification.empty();
                selectModification.append('<option>Выберите модификацию</option>');
                clear();
                modificationList = modificationlist;
                for(let i = 0; i < modificationlist.length; i++){
                    selectModification.append('<option value="'+ modificationlist[i].id +'">'+ modificationlist[i].name +'</option>');
                }
            },
            error: function(xhr, status, error){
                let errorMessage = xhr.status + ': ' + xhr.statusText;
                alert('Error - ' + errorMessage);
            }
        })


        selectModification.prop('disabled', false);
    } else {
        selectModification.prop('disabled', true);
        $('#modification option:first').prop('selected', true);
        selectEquipment.prop('disabled', true);
        $('#equipment option:first').prop('selected', true);
        countNameplate = 0;
        $('#countNameplate').text(countNameplate);
    }

})

//обработчик изменения списка модификаций
selectModification.change(function (event) {
    if ($('#modification option:selected').text() !== 'Выберите модификацию') {
        // запрос в базу на получение списка цветов

        let currentValueModification = $('#modification option:selected').val()



        let modificationTrunk;
        let isRow3;

        for (let i = 0; i < modificationList.length; i++){
                console.log(modificationList[i].id);
            if (modificationList[i].id == currentValueModification) {
                modificationCoefficient = modificationList[i].coefficient;
                modificationTrunk = modificationList[i].trunk;
                isRow3 = modificationList[i].row3;
                break;
            }
        }
        if (material === 'eva') {
            materialCoefficient = materiaList[0].coefficient;
            jumper = materialCoefficient * modificationCoefficient * additionList[0].price;
            $('#jumpertext').text('Перемычка (+'+jumper+'руб.)');
            $('#jumper').prop('disabled', false);

            trunk = materialCoefficient * modificationTrunk * materialCoefficient * additionList[1].price;
            $('#trunktext').text('Коврик в багажник (+'+trunk+'руб.)');
            $('#trunk').prop('disabled', false);

            if (isRow3){
                row3 = materialCoefficient * modificationCoefficient * additionList[2].price;
                $('#row3text').text('Третий ряд (+'+row3+'руб.)');
                $('#row3').prop('disabled', false);
            }
        }

        for(let i = 0; i < equipmentList.length; i++){
            let price =  equipmentList[i].price * modificationCoefficient * materialCoefficient;
            selectEquipment.append('<option value="'+ equipmentList[i].id +'">'+ equipmentList[i].name+ ' (+' + price + ' руб.)</option>');
        }

        selectEquipment.prop('disabled', false);
    } else {
        selectEquipment.prop('disabled', true);
        $('#equipment option:first').prop('selected', true);
        countNameplate = 0;
        $('#countNameplate').text(countNameplate);
    }
})

//обработчик изменения списка комплектации
selectEquipment.change(function (){
    for (let i = 0; i < equipmentList.length; i++) {
        if (equipmentList[i].id === $('#equipment :selected').val()) {
            priceEquipment = modificationCoefficient * materialCoefficient * equipmentList[i].price;
            sumOrder += priceEquipment;
            break;
        }
    }
})

//функция добавления перемычки
$('#jumper').change(function () {
    changeSumOrder(this, jumper);
})

//функция добавления коврика на третий ряд
$('#row3').change(function () {
    changeSumOrder(this, row3);
})

//функция добавления коврика в багажник
$('#trunk').change(function () {
    changeSumOrder(this, trunk);
})

//функция добавления заводских креплений
$('#mounts').change(function () {
    changeSumOrder(this, mounts);
})

function changeSumOrder(el, price) {
    if (el.checked) {
        $('#total').text(sumOrder += price);
    } else {
        $('#total').text(sumOrder -= price);
    }
}

//функция добавления подпятника
$('#saddle').change(function () {
    if ($('#saddle option:selected').text() !== 'Без подпятника') {
        if (!isSaddle) {
            $('#total').text(sumOrder += saddle);
            isSaddle = true;
        }
    } else {
        $('#total').text(sumOrder -= saddle);
        isSaddle = false;
    }
})

//функция вычитания шильдика
$('#btnMinusNameplate').click(function () {
    if (countNameplate > 0) {
        countNameplate--;
        $('#countNameplate').text(countNameplate);
        $('#total').text(sumOrder -= 150);
    }
})

//функция прибавления шильдика
$('#btnPlusNameplate').click(function () {
    countNameplate++;
    $('#countNameplate').text(countNameplate);
    $('#total').text(sumOrder += 150);
})


// начальные настройки страницы
function initialize() {

    $('#jumper').prop('disabled', true);
    $('#row3').prop('disabled', true);
    $('#trunk').prop('disabled', true);

    //запрос в БД для получения списка марок автомобилей
    console.log('initialize')
    $.ajax({
        url: '/brand',
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function (brandlist) {
            for(let i = 0; i < brandlist.length; i++){
                selectBrand.append('<option value="'+ brandlist[i].id +'">'+ brandlist[i].name +'</option>');
            }
        },
        error: function(xhr, status, error){
            let errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    })

    //получение списка вожможных комплектов
    $.ajax({
        url: '/equipment',
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function (equipmentlist){
            equipmentList = equipmentlist;
        },
        error: function(xhr, status, error){
            let errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    })

    //получение списка допов
    $.ajax({
        url: '/addition',
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function (additionlist){
            additionList = additionlist;
            mounts = additionlist[3].price;
            $('#mountstext').text('Заводские крепления (+'+ mounts +'руб.)');
            $('#saddle').append('<option value="'+additionlist[4].id+'">'+additionlist[4].name+'</option>');
            $('#saddle').append('<option value="'+additionlist[6].id+'">'+additionlist[6].name+'</option>');
            saddle = additionlist[4].price;
        },
        error: function(xhr, status, error){
            let errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    })

    //получене списка материалов ковриков
    $.ajax({
        url: '/material',
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function (materialist){
            materiaList = materialist;
            console.log(materiaList);
        },
        error: function(xhr, status, error){
            let errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    })

    selectModel.prop('disabled', true);
    selectModification.prop('disabled', true);
    selectEquipment.prop('disabled', true);
}

function clear(){
    $('#jumpertext').text('Перемычка');
    $('#jumper').prop('disabled', true);
    $('#jumper').prop('checked', false);

    $('#row3text').text('Третий ряд');
    $('#row3').prop('disabled', true);
    $('#row3').prop('checked', false);

    $('#trunktext').text('Коврик в багажник');
    $('#trunk').prop('disabled', true);
    $('#trunk').prop('checked', false);

    selectEquipment.prop('disabled', true);
    $('#equipment option:first').prop('selected', true);

    jumper = 0;
    row3 = 0;
    trunk = 0;
    sumOrder = 0;

    if ($('#mounts').is(':checked')) sumOrder += mounts;
    if ($('#saddle :selected').text() !== 'Без подпятника') sumOrder += saddle;

    $('#total').text(sumOrder);
}


