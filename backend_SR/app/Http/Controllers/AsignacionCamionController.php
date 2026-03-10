<?php

namespace App\Http\Controllers;

use App\Models\AsignacionCamion;
use Illuminate\Http\Request;

class AsignacionCamionController extends Controller {

    // listar todas las asignaciones
    public function index() {
        $asignaciones = AsignacionCamion::with(['camion','ruta'])->get();

        return response()->json($asignaciones);
    }


    // crear asignaciones
    public function store(Request $request) {
        $request->validate([
            'fecha' => 'required|date',
            'id_camion' => 'required|exists:camion,id_camion',
            'id_ruta' => 'required|exists:ruta,id_ruta'
        ]);

        $asignacion = AsignacionCamion::create([
            'fecha' => $request->fecha,
            'id_camion' => $request->id_camion,
            'id_ruta' => $request->id_ruta
        ]);

        return response()->json([
            'message' => 'Asignación creada correctamente',
            'data' => $asignacion
        ], 201);
    }


    // mostrar asignaciones
    public function show($id) {
        $asignacion = AsignacionCamion::with(['camion','ruta'])->find($id);

        if(!$asignacion){
            return response()->json([
                'message' => 'Asignación no encontrada'
            ],404);
        }

        return response()->json($asignacion);
    }


    // actualizar una asignacion
    public function update(Request $request, $id) {
        $asignacion = AsignacionCamion::find($id);

        if(!$asignacion){
            return response()->json([
                'message' => 'Asignación no encontrada'
            ],404);
        }

        $request->validate([
            'fecha' => 'required|date',
            'id_camion' => 'required|exists:camion,id_camion',
            'id_ruta' => 'required|exists:ruta,id_ruta'
        ]);

        $asignacion->update([
            'fecha' => $request->fecha,
            'id_camion' => $request->id_camion,
            'id_ruta' => $request->id_ruta
        ]);

        return response()->json([
            'message' => 'Asignación actualizada',
            'data' => $asignacion
        ]);
    }


    // eliminar una asignacion
    public function destroy($id) {
        $asignacion = AsignacionCamion::find($id);

        if(!$asignacion){
            return response()->json([
                'message' => 'Asignación no encontrada'
            ],404);
        }

        $asignacion->delete();

        return response()->json([
            'message' => 'Asignación eliminada'
        ]);
    }
}