<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WebApplication3.WebForm1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <style>
        td{
            margin:10px;
            padding:5px;
        }
    </style>
    <div class="container">
        <form>
            <fieldset>
                <legend>Reserve Table</legend>
                <div class="col-md-6">
                    <div class="col-md-6">
                        Name:
                    </div>
                    <div class="col-md-6">
                        <input type="text" data-bind="value:userName"/>
                    </div>
                    <div class="col-md-6">
                        Contact Number:
                    </div>
                    <div class="col-md-6">
                        <input type="text" data-bind="value:userContact" maxlength=10/>
                    </div>
                    <div class="col-md-6">
                        Available Table:
                    </div>
                    <div class="col-md-6">
                        <span data-bind="if:$root.availableTables().length!=0">
                            <select data-bind="options:$root.availableTables, optionsText:'tableType', value:selectedTableId, optionsValue:$data,optionsCaption:'Choose..'"></select>
                        </span>
                        <span data-bind="ifnot: $root.availableTables().length!=0" style="color:red; margin-top:5px">
                            No Table Available
                        </span>
                    </div>
                    <div class="col-md-4"><button class="btn btn-primary" data-bind="click:addUser">Reserve</button></div>
                </div>
            </fieldset>   
        </form>
        <div style="margin:15px; padding:10px">
            <table class="table table-striped">
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Table Type</th>
                </thead>
                <tbody data-bind="foreach:users">
                    <td>
                        <span data-bind="text:userId"></span>
                    </td>
                    <td>
                        <span data-bind="text:userName"></span>
                    </td>
                    <td>
                        <span data-bind="text:userContact"></span>
                    </td>
                    <td>
                        <span data-bind="text: selectedTableId().tableType"></span>
                    </td>
                    <td>
                        <button data-bind="click: $root.cancelReservation" class="btn btn-danger">Cancel</button>
                    </td>
                </tbody>
            </table>
        </div>
    </div>
    <script src="practice1.js"></script>
</asp:Content>
