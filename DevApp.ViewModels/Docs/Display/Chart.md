## Chart

The elements to display a chart; based on the popular [Chart.js](https://www.chartjs.org/). 

There are several ways to specify the view model property values:
- as an array of values; can be any type.
- as a two-dimensional string array of labels and values.
- as an array of key-value pairs.

You can use the [CRUD APIs](http://dotnetify.net/react/crud) on the array to update the chart.  For updates and deletes, use the array of key-value pairs and set the _&lt;prop-name&gt;&#95;itemKey_ property to "Key".

#### Line Chart

[inset]

```csharp
public class LineChartExample : BaseVM
{
   public LineChartExample()
   {
      var timer = Observable.Interval(TimeSpan.FromSeconds(1));
      var data = Enumerable.Range(1, 30)
         .Select(x => new string[] { $"{x}", $"{Math.Sin(x / Math.PI)}" }).ToArray();

      AddProperty("Waveform", data)
         .WithAttribute(new ChartAttribute 
         { 
            XAxisLabel = "Time (second)", 
            YAxisLabel = "in/sec", 
            MaxDataSize = 30 
         });

      timer.Subscribe(x => 
      {
         x += 31;
         this.AddList("Waveform", new string[] { $"{x}", $"{Math.Sin(x / Math.PI)}" });
         PushUpdates();
      });
   }
}
```

#### Bar Chart

[inset]

```csharp
public class BarChartExample : BaseVM
{
   public BarChartExample()
   {
      int[] data = [ /* data array */ ];

      AddProperty("MonthlySales", data)
         .WithAttribute(new ChartAttribute 
         { 
            YAxisLabel = "Revenue (US$)",
            Labels = new string[] { "Jan", "Feb", "Mar", /* ... */ } 
         });
   }
}
```

#### Pie Chart

[inset]

```csharp
public class PieChartExample : BaseVM
{
   public PieChartExample()
   {
      var random = new Random();
      var data = new Dictionary<string, double>
      {
         { "cpu", 0.2 }, { "mem", 0.4 }, { "dsk", 0.3 }
      }.ToArray();

      AddProperty("Utilization", data)
         .WithAttribute(new ChartAttribute
         {
            Labels = new string[] { "CPU", "Memory", "Disk" }
         });

      // Must declare item key so we can update any data in the array given a key.
      AddProperty("Utilization_itemKey", "Key");

      AddProperty<object>("Refresh")
         .Subscribe(_ => this.UpdateList("Utilization", new 
         { 
            Key = "mem", 
            Value = random.NextDouble() 
         }));
   }
}
```

#### Customization

The chart's line and area colors are themeable.  If you need further customization, override the configuration through the _config_ property.  For example:

```jsx
const showLegendAtTop = {
   options: {
      legend: {
         display: true,
         position: 'top'
      }
   }
};
/* ... */
<PieChart id="Utilization" config={showLegendAtTop} />
```

#### Source

- http://www.chartjs.org/ ([license: MIT](http://www.chartjs.org/docs/latest/notes/license.html))
- https://github.com/jerairrest/react-chartjs-2 ([license: MIT](https://github.com/jerairrest/react-chartjs-2/blob/master/LICENSE.md))
- https://github.com/nagix/chartjs-plugin-streaming ([license: MIT](https://github.com/nagix/chartjs-plugin-streaming/blob/master/LICENSE.md))

#### Property Types

```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string,

   // Chart configuration (see chartjs.org).
   config: PropTypes.object
};
```

#### Server-side Attribute

```csharp
public class ChartAttribute
{
   // Data labels.
   public string[] Labels { get; set; }

   // X-axis label.
   public string XAxisLabel { get; set; }

   // Y-axis label.
   public string YAxisLabel { get; set; }

   // Maximum number of data to display. 
   // Overflow will be trimmed from start of array.
   public int MaxDataSize { get; set;}
}
```