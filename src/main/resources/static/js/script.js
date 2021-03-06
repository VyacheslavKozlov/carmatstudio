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
let namePlate = 0;

let modificationCategory;

let materialCategory;
let priceEquipment = 0;

let equipmentList;
let modificationList;
let additionList;
let materialList;

let material = 'eva';

let colorList;

let urlImg;

initialize();

//обработчик изменения списка брендов
$('#brand').change(function () {
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
        clear();

    }

})

//обработчик изменения списка моделей
selectModel.change(function () {
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
        defaultSelectEquipment();
        clear();
    }

})

//обработчик изменения списка модификаций
selectModification.change(function (event) {
    if ($('#modification option:selected').text() !== 'Выберите модификацию') {
        // запрос в базу на получение списка цветов

        let currentValueModification = $('#modification option:selected').val();
        let modificationTrunk;
        let isRow3;
        let isJumper;

        for (let i = 0; i < modificationList.length; i++){
            if (modificationList[i].id == currentValueModification) {
                modificationCategory = modificationList[i].category.id; //получаем категорию автомобиля
                modificationTrunk = modificationList[i].trunk;          //получаем площадь багажника
                isRow3 = modificationList[i].row3;
                isJumper = modificationList[i].jumper;
                break;
            }
        }
        console.log('after change modification')

        if (isJumper){
            jumper = additionList[0].price;
            $('#jumpertext').text('Перемычка (+'+jumper+'руб.)');
            $('#jumper').prop('disabled', false);
        } else {
            $('#jumpertext').text('Перемычка');
            $('#jumper').prop('disabled', true);
            $('#jumper').prop('checked', false);
            sumOrder -= jumper;
            $('total').text(sumOrder);
            jumper = 0;
        }

        if (trunk !== 0) {
            sumOrder -= trunk;
            $('#trunk').prop('checked', false);
            $('total').text(sumOrder);
        }

        trunk = additionList[1].price;
        $('#trunktext').text('Коврик в багажник (+'+trunk+'руб.)');
        $('#trunk').prop('disabled', false);

        if (isRow3){
            row3 = additionList[2].price;
            $('#row3text').text('Третий ряд (+'+row3+'руб.)');
            $('#row3').prop('disabled', false);
        } else {
            $('#row3text').text('Третий ряд');
            $('#row3').prop('disabled', true);
            $('#row3').prop('checked', false);
            sumOrder -= row3;
            $('total').text(sumOrder);
            row3 = 0;
        }

        defaultSelectEquipment();
        getEquipments(modificationCategory);

        selectEquipment.prop('disabled', false);
    } else {
        selectEquipment.prop('disabled', true);
        $('#equipment option:first').prop('selected', true);
        clear();
    }
})

//обработчик изменения списка комплектации
selectEquipment.change(function (){
    if (priceEquipment !== 0) sumOrder -= priceEquipment;
    priceEquipment = 0;
    if ($('#equipment :selected').text() !== 'Выберите комплектацию'){
        for (let i = 0; i < equipmentList.length; i++) {
            if (equipmentList[i].id == $('#equipment :selected').val()) {
                priceEquipment = equipmentList[i].price;
                sumOrder += priceEquipment;
                console.log('+ equipment = ' + priceEquipment);
                console.log('+ sumOrder = ' + sumOrder);
                $('#total').text(sumOrder);
                break;
            }
        }
    } else{
        sumOrder -= priceEquipment;
        $('#total').text(sumOrder);
    }
})

//обработчик выбора цвета основы
$('#rug-color').change(function (){
    if ($('#rug-color :selected').text() !== 'Выберите цвет') {
        for (let i = 0; i < colorList.length; i++) {
            if (colorList[i].id == $('#rug-color :selected').val()) {
                $('#rugimg img').attr("src", colorList[i].url);
                $('#rugimg img').show();
            }
        }
    }
    else $('#rugimg img').hide();
})

//обработчик выбора цвета окантовки
$('#border-color').change(function (){
    if ($('#border-color :selected').text() !== 'Выберите цвет') {
        for (let i = 0; i < colorList.length; i++) {
            if (colorList[i].id == $('#border-color :selected').val()) {
                $('#borderimg').css("background", colorList[i].url);
            }
        }
    }
})

//обработчик выбора цвета окантовки
$('#border-color').change(function (){
    if ($('#border-color :selected').text() !== 'Выберите цвет') {
        for (let i = 0; i < colorList.length; i++) {
            if (colorList[i].id == $('#border-color :selected').val()) {
                $('#border-color img').attr("src", colorList[i].url);
                $('#border-color img').show();
            }
        }
    }
    else $('#rugimg img').hide();
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
            if ($('#saddle option:selected').text() === 'Алюминиевый' ||
                $('#saddle option:selected').text() === 'Полиуретановый') saddle = additionList[4].price;
            else saddle = additionList[7].price;
            $('#total').text(sumOrder += saddle);
            isSaddle = true;
        } else {
            sumOrder -= saddle;
            if ($('#saddle option:selected').text() === 'Алюминиевый' ||
                $('#saddle option:selected').text() === 'Полиуретановый') saddle = additionList[4].price;
            else saddle = additionList[7].price;
            sumOrder += saddle;
            $('#total').text(sumOrder);
        }

    } else {
        $('#total').text(sumOrder -= saddle);
        isSaddle = false;
        saddle = 0;
    }
})

//функция вычитания шильдика
$('#btnMinusNameplate').click(function () {
    if (countNameplate > 0) {
        countNameplate--;
        $('#countNameplate').text(countNameplate);
        $('#total').text(sumOrder -= 150);
    }
    if (countNameplate == 0) $('#rugimg div').hide();
})

//функция прибавления шильдика
$('#btnPlusNameplate').click(function () {
    countNameplate++;
    $('#rugimg div').show();
    $('#countNameplate').text(countNameplate);
    $('#total').text(sumOrder += 150);
})


// начальные настройки страницы
function initialize() {

    console.log('initialize');
    getAllBrands();
    getAllAditions();
    getAllMaterials();


    $('#jumper').prop('disabled', true);
    $('#row3').prop('disabled', true);
    $('#trunk').prop('disabled', true);
    selectModel.prop('disabled', true);
    selectModification.prop('disabled', true);
    selectEquipment.prop('disabled', true);

    $('#rugimg').append('<img style="height: 100%; width: 100%; object-fit: cover; border-radius: 5px" src="" />');
    $('#rugimg img').hide();
    $('#rugimg div').hide();

    if (material === 'eva'){
        $('#stitching-color').attr('hidden', 'hidden');
        materialCategory = 1;
    } else {
        $('#form3d').attr('hidden', 'hidden');
        if (material === 'economy') {
            materialCategory = 2;
        } else if (material === 'standart'){
            materialCategory = 3;
        } else if (material === 'premium'){
            materialCategory = 4;
        }
    }

    $.ajax({
        url: '/color/'+materialCategory,
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function (data){
            console.log(data);
            colorList = data;
            for(let i = 0; i < colorList.length; i++){
                if (colorList[i].plot === 'Основа') {
                    $('#rug-color').append('<option value="' + colorList[i].id + '">' + colorList[i].color + '</option>');
                }
                if (colorList[i].plot === 'Окантовка') {
                    $('#border-color').append('<option value="' + colorList[i].id + '">' + colorList[i].color + '</option>');
                }
            }
        },
        error: function(xhr, status, error){
            let errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    })
}

//запрос в БД для получения списка марок автомобилей
function getAllBrands(){
    $.ajax({
        url: '/brand',
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function (brandlist) {
            for(let i = 0; i < brandlist.length; i++){
                $('#brand').append('<option value="'+ brandlist[i].id +'">'+ brandlist[i].name +'</option>');
            }
        },
        error: function(xhr, status, error){
            let errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    })
}

function getEquipments(category){
    //получение списка вожможных комплектов
    $.ajax({
        url: '/equipment/' + category + '/' + materialCategory,
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function (data){
            equipmentList = data;
            console.log(equipmentList);

            for(let i = 0; i < equipmentList.length; i++){
                selectEquipment.append('<option value="'+ equipmentList[i].id +'">'+
                    equipmentList[i].name+ ' (+' + equipmentList[i].price + ' руб.)</option>');
            }
        },
        error: function(xhr, status, error){
            let errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    })
}

//получение списка допов
function getAllAditions(){
    $.ajax({
        url: '/addition',
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function (data){
            additionList = data;
            mounts = additionList[3].price;
            $('#mountstext').text('Заводские крепления (+'+ mounts +'руб.)');
            $('#saddle').append('<option value="'+additionList[4].id+'">'+additionList[4].name+'</option>');
            $('#saddle').append('<option value="'+additionList[6].id+'">'+additionList[6].name+'</option>');
            saddle = additionList[4].price;
            if (material !== 'eva') {
                $('#saddle').append('<option value="' + additionList[7].id + '">' + additionList[7].name + '</option>');
                saddle = additionList[7].price;
            }

            namePlate = additionList[5].price;
        },
        error: function(xhr, status, error){
            let errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    })
}

//получение списка материалов коврика
function getAllMaterials(){
    $.ajax({
        url: '/material',
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function (data){
            materialList = data;
            console.log(materialList);
        },
        error: function(xhr, status, error){
            let errorMessage = xhr.status + ': ' + xhr.statusText;
            alert('Error - ' + errorMessage);
        }
    })
}

