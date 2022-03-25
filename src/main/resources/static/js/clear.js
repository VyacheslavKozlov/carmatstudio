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

    selectEquipment.empty();
    selectEquipment.append('<option>Выберите комплектацию</option>>');
    selectEquipment.prop('disabled', true);

    priceEquipment = 0;
    jumper = 0;
    row3 = 0;
    trunk = 0;
    sumOrder = 0;

    sumOrder = sumOrder + countNameplate * namePlate;
    if ($('#mounts').is(':checked')) sumOrder += mounts;
    if ($('#saddle :selected').text() !== 'Без подпятника') sumOrder += saddle;

    $('#total').text(sumOrder);
}