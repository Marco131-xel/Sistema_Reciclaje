<?php

namespace App\Http\Controllers;

use App\Models\PuntoVerde;
use Illuminate\Http\Request;

class PuntoVerdeController extends Controller {

    // funcion para mostar los puntos verdes
    public function index() {
        try {
            $puntos = PuntoVerde::with('contenedores.material')->get();
            return response()->json($puntos,200);
        } catch (\Exception $e) {
            return response()->json([
                'mensaje' => 'Error al obtener puntos verdes', 'error' => $e->getMessage()], 500);
        }
    }

    // funcion para crear puntos verdes
    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required|max:100',
            'direccion' => 'required|max:200',
            'latitud' => 'required',
            'longitud' => 'required',
            'capacidad' => 'required',
            'horario' => 'required',
            'encargado' => 'required'
        ]);

        try {
            $punto = PuntoVerde::create($request->all());
            return response()->json(['mensaje'=>'Punto verde creado', 'data'=>$punto], 201);
        } catch (\Exception $e) {
            return response()->json(['mensaje'=>'Error al crear punto verde', 'error'=>$e->getMessage()], 500);
        }
    }

    // funcion para verificar un punto verde en especifico
    public function show($id){
        try {
            $punto = PuntoVerde::with('contenedores.material')->findOrFail($id);
            return response()->json($punto,200);
        } catch (\Exception $e) {
            return response()->json(['mensaje'=>'Punto verde no encontrado'], 404);
        }
    }

    // funcion para actualiar punto verde
    public function update(Request $request,$id) {
        try {
            $punto = PuntoVerde::findOrFail($id);
            $punto->update($request->all());

            return response()->json(['mensaje'=>'Punto verde actualizado', 'data'=>$punto],200);
        } catch (\Exception $e) {
            return response()->json(['mensaje'=>'Error al actualizar'],500);
        }
    }

    // funcion para eliminar un punto verde
    public function destroy($id){
        try {
            $punto = PuntoVerde::findOrFail($id);
            $punto->delete();
            return response()->json(['mensaje'=>'Punto verde eliminado'],200);
        } catch (\Exception $e) {
            return response()->json(['mensaje'=>'Error al eliminar'],500);
        }
    }
}