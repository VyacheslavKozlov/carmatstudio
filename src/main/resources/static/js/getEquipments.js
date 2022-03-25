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