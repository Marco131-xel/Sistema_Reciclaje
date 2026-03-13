<?php

namespace App\Http\Controllers;

use App\Models\Contenedor;
use Illuminate\Http\Request;

class ContenedorController extends Controller {

    // funcion para mostar los contenedores
    public function index() {
        try {
            $contenedores = Contenedor::with(['puntoVerde','material'])->get();
            return response()->json($contenedores,200);
        } catch (\Exception $e) {
            return response()->json(['mensaje'=>'Error al obtener contenedores'],500);
        }
    }

    // funcion para crear contenedores
    public function store(Request $request){
        $request->validate([
            'capacidad'=>'required',
            'porcentaje'=>'required',
            'id_punto_verde'=>'required',
            'id_material'=>'required'
        ]);

        try {
            $contenedor = Contenedor::create($request->all());
            return response()->json([
                'mensaje'=>'Contenedor creado',
                'data'=>$contenedor
            ],201);

        } catch (\Exception $e) {
            return response()->json([
                'mensaje'=>'Error al crear contenedor'
            ],500);
        }
    }

    // funcion para mostrar un contendor en especifico
    public function show($id) {
        try {
            $contenedor = Contenedor::with([
                'puntoVerde',
                'material'
            ])->findOrFail($id);
            return response()->json($contenedor,200);

        } catch (\Exception $e) {
            return response()->json([
                'mensaje'=>'Contenedor no encontrado'
            ],404);
        }
    }

    // funcion para actualizar contenedores
    public function update(Request $request,$id) {
        try {
            $contenedor = Contenedor::findOrFail($id);
            $contenedor->update($request->all());
            return response()->json([
                'mensaje'=>'Contenedor actualizado',
                'data'=>$contenedor
            ],200);

        } catch (\Exception $e) {
            return response()->json([
                'mensaje'=>'Error al actualizar'
            ],500);
        }
    }

    // funcion para elimianr contenedor
    public function destroy($id) {
        try {
            Contenedor::destroy($id);
            return response()->json([
                'mensaje'=>'Contenedor eliminado'
            ],200);

        } catch (\Exception $e) {
            return response()->json([
                'mensaje'=>'Error al eliminar'
            ],500);
        }
    }
}