## Chart

The element to display a chart.  

#### Line Chart

[inset]

```csharp
public class LineChartExample : BaseVM
{
   public LineChartExample()
   {
      var random = new Random();
      var timer = Observable.Interval(TimeSpan.FromSeconds(1));
      var initialWaveform = Enumerable.Range(1, 30)
         .Select(x => new string[] { $"{x}", $"{Math.Sin(x / Math.PI)}" }).ToArray();

      AddProperty("Waveform", initialWaveform)
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
      var random = new Random();
      var timer = Observable.Interval(TimeSpan.FromSeconds(1));
      var initialValues = Enumerable.Range(1, 12).Select(x => random.Next(500, 1000)).ToArray();

      AddProperty("MonthlySales", initialValues)
         .WithAttribute(new ChartAttribute 
         { 
            YAxisLabel = "Revenue (US$)",
            Labels = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" } 
         })
         .SubscribeTo(timer
            .Select(_ => Enumerable.Range(1, 12).Select(x => random.Next(500, 1000)).ToArray()));
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
      var timer = Observable.Interval(TimeSpan.FromSeconds(1));
      var initialValues = Enumerable.Range(1, 3).Select(x => random.NextDouble() * 100).ToArray();

      AddProperty("Utilization", initialValues)
         .WithAttribute(new ChartAttribute 
         { 
            Labels = new string[] { "CPU", "Memory", "Disk" } 
         })
         .SubscribeTo(timer
            .Select(_ => Enumerable.Range(1, 3).Select(x => random.NextDouble() * 100).ToArray()));         
   }
}
```

#### Source

This element incorporates:
- http://www.chartjs.org/ ([license: MIT](http://www.chartjs.org/docs/latest/notes/license.html))
- https://github.com/jerairrest/react-chartjs-2 ([license: MIT](https://github.com/jerairrest/react-chartjs-2/blob/master/LICENSE.md))

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