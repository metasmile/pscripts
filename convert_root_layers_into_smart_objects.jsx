app.preferences.rulerUnits = Units.PIXELS;

getThoseLayers();

function getThoseLayers() {
    var srcDoc = app.activeDocument;
    var numOfLayers = srcDoc.layers.length;

    // get the top layer
    srcDoc.activeLayer = srcDoc.layers[0];

    for (var i = numOfLayers - 1; i >= 0; i--) {
        if (!srcDoc.layers[i].isBackgroundLayer) {
            showLayer(srcDoc.layers[i].name)
            selectLayer(srcDoc.layers[i].name)
            convertCurrentSelectedLayerToSmartObject()
        }
    }
}

function selectLayer(alayername) {
    if (alayername == null)
        return

    try {
        var idslct = charIDToTypeID("slct");
        var desc6 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref5 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref5.putName(idLyr, alayername);
        desc6.putReference(idnull, ref5);
        var idMkVs = charIDToTypeID("MkVs");
        desc6.putBoolean(idMkVs, false);
        executeAction(idslct, desc6, DialogModes.NO);

    } catch (e) {
        alert("Whoops! Problem getting layer " + alayername)
    }
}

function showLayer(layerName) {
    var idShw = charIDToTypeID("Shw ");
    var desc44 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var list29 = new ActionList();
    var ref40 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref40.putName(idLyr, layerName);
    list29.putReference(ref40);
    desc44.putList(idnull, list29);
    executeAction(idShw, desc44, DialogModes.NO);
}

// create smartobject
function convertCurrentSelectedLayerToSmartObject() {
    try {
        var idnewPlacedLayer = stringIDToTypeID("newPlacedLayer");
        executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
    } catch (e) {
        alert("Whoops! Failed to make smart object " + e)
    }
}
