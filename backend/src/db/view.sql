CREATE VIEW view_vou_detail
AS
SELECT 
       id,
       DATE (Vou_Date) AS Vou_Date, 
       Vou_No,ledger.Description|| " " || Chq_No AS Description, 
       DR, 
       CR, 
       Chq_No, 
       Chq_Date, 
       RefNo, 
       Project, 
       projects.Code AS Project_Code, 
       Projects.Title AS Project_Title, 
       Supplier, 
       Suppliers.Code AS Supplier_Code, 
       Suppliers.Title AS Supplier_Title, 
       COA, 
       COA.Code AS COA_Code, 
       COA.TITLE AS COA_TITLE, 
       Unit, 
       Units.Code AS Unit_Code, 
       Units.Title AS Unit_Title,
       stock, 
       Stocks.Code AS stock_Code, 
       Stocks.Title AS stock_Title,
       employee,
       Employee.Code as employee_Code,
       Employee.Title as employee_Title
FROM   Ledger
       LEFT JOIN COA ON Ledger.COA = COA.ID
       LEFT JOIN Suppliers ON Ledger.Supplier= Suppliers.ID
       LEFT JOIN Projects ON Ledger.Project = Projects.ID
       LEFT JOIN Units ON Ledger.Unit = Units.ID
       LEFT JOIN Stocks ON Ledger.Stock = Stocks.ID
       LEFT JOIN Employees ON Ledger.Employee = Employees.ID
       
ORDER  BY
          Vou_Date,
          Project,
          Supplier,
          COA,
          Unit,
          Stock,
          Employee