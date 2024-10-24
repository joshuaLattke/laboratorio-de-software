<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <html>
            <head>
                <title>Colorful Breakfast Menu</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f8ff;
                        color: #333;
                    }
                    h2 {
                        text-align: center;
                        color: #4CAF50;
                    }
                    table {
                        width: 80%;
                        margin: auto;
                        border-collapse: collapse;
                        background-color: #fff;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    th {
                        background-color: #4CAF50;
                        color: white;
                        padding: 12px;
                    }
                    td {
                        padding: 10px;
                        text-align: left;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    tr:hover {
                        background-color: #e0f7fa;
                    }
                    th, td {
                        border: 1px solid #ddd;
                    }
                    .price {
                        font-weight: bold;
                        color: #e91e63;
                    }
                    .calories {
                        font-style: italic;
                        color: #9c27b0;
                    }
                </style>
            </head>
            <body>
                <h2>Breakfast Menu</h2>
                <table>
                    <tr>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Calories</th>
                    </tr>
                    <!-- Template for food items -->
                    <xsl:for-each select="breakfast_menu/food">
                        <tr>
                            <td><xsl:value-of select="name" /></td>
                            <td class="price"><xsl:value-of select="price" /></td>
                            <td><xsl:value-of select="description" /></td>
                            <td class="calories"><xsl:value-of select="calories" /> kcal</td>
                        </tr>
                    </xsl:for-each>
                    <!-- Template for drink items -->
                    <xsl:for-each select="breakfast_menu/drink">
                        <tr>
                            <td><xsl:value-of select="name" /></td>
                            <td class="price"><xsl:value-of select="price" /></td>
                            <td><xsl:value-of select="description" /></td>
                            <td class="calories"><xsl:value-of select="calories" /> kcal</td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
