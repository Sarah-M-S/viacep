sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/model/Model"

], function(Controller, formatter, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.Home", {

		_modeloViaCep: null,
		_modeloLog: null,

		formatter: formatter,
		
		onInit:function(evt){
			if(!this._modeloViaCep){
				this._modeloViaCep = new JSONModel();
				this.getView().setModel(this._modeloViaCep, "viacep")
				this._modeloViaCep
					.attachRequestCompleted(this.onRequestCompleted, this)
			}
			var oLog = {
				pesquisas: [],
			/*	outroArray: [],
				maisUmArray: [],
				String: "abcdede" */
			}
			this._modeloLog = new JSONModel(oLog);
			this.byId("list").setModel(this._modeloLog, "log")
					//	oLog.getProperty("/ftest")
		},
		
		formatLogradouro:function(sLogradouro){
			if(!sLogradouro){
				return ""
			}	
			return sLogradouro.toUpperCase()	
		},

		formatUf:function(sUf){
			if(!sUf){
				return ""
			}
			const est1 = {
				SP: 'São Paulo', RJ:'Rio de Janeiro', RS:'Rio Grande do Sul', TO:'Tocantins', SE:'Sergipe',
				SC: 'Santa Catarina', RR:'Roraima', RO:'ROndonia', RN:'Rio Grande do Norte', PI:'Piauí',
				PE:'Pernambuco', PR: 'Paraná', PB:'Paraíba', PA: 'Pará', MG: 'Minas Gerais', MS: 'Mato Grosso do Sul'

			}
			return est1[sUf];
		},


		onSearch:function(evt){
			/*var Obj = {
				cep: "010100000"
			} */
			var scep = evt.getParameters().query;
			this._modeloViaCep.loadData("https://viacep.com.br/ws/" + scep + "/json/")
			this._modeloViaCep.setProperty("/cep", scep);
		//window._modeloViaCep = oModel
			var oInputEstado = this.byId("estado")
			var oInputRua = this.byId("rua")
			
			
				
				
			

			
			fnTeste: onSearch(aa)
			
			/*var sRua = oModel.getProperty("/logradouro")
			oInputRua.setValue(sRua)*/
			//test.setvalue("teste")
			//oModel.setProperty("/", {});
		},

		onRequestCompleted:function(evt){
			var aPesquisas = this._modeloLog.getProperty("/pesquisas")

			aPesquisas.push({
				cep: this._modeloViaCep.getProperty("/cep"), 
				rua: this._modeloViaCep.getProperty("/logradouro"), 
				estado: this._modeloViaCep.getProperty("/uf")
			})

			this._modeloLog.setProperty("/pesquisas", aPesquisas)
		}
		
		
	});
});