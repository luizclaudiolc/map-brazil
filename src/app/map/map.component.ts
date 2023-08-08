import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  width = 900;
  height = 900;
  private margin = { top: 20, right: 32, bottom: 40, left: 70 };
  data: any;

  constructor(private srv: MapService) {}

  ngOnInit(): void {
    this.srv.get().subscribe((e) => {
      const dataBrasil = e;

      d3.select('.app-map-svg').append('svg').attr('id', 'svg-brazil');

      const svg = d3
        .select('#svg-brazil')
        .attr('width', this.width)
        .attr('height', this.height);

      const projection = d3.geoMercator().center([-55, -10]).scale(800);

      const pathGenerator = d3.geoPath().projection(projection);

      const g = svg
        .append('g')
        .attr('class', 'map')
        .attr('transform', `translate(0,0)`);

      const colorScale = d3
        .scaleOrdinal()
        .domain(dataBrasil.features.map((d: any) => d.properties.UF_05))
        .range(d3.schemePastel2);

      const colorValue = (d: any) => d.properties.UF_05;

      g.selectAll('.map-feature')
        .data(dataBrasil.features)
        .enter()
        .append('path')
        .attr('class', 'map-feature')
        .attr('d', (d: any) => pathGenerator(d))
        .style('fill', (d: any) => colorScale(colorValue(d)) as string);

      g.selectAll('.state-label')
        .data(dataBrasil.features)
        .enter()
        .append('text')
        .attr('class', 'state-label')
        .attr(
          'transform',
          (d: any) => `translate(${pathGenerator.centroid(d)})`
        )
        .attr('dy', '.35em')
        .style('font-size', '12px')
        .text((d: any) => d.properties.UF_05);

      const regionCentroids = [
        { name: 'Sudeste', coordinates: [-43, -20] },
        { name: 'Sul', coordinates: [-52, -26] },
        { name: 'Norte', coordinates: [-58, -7] },
        { name: 'Centro-Oeste', coordinates: [-53, -14] },
        { name: 'Nordeste', coordinates: [-41, -6] },
      ];

      g.selectAll('.region-label')
        .data(regionCentroids)
        .enter()
        .append('text')
        .attr('class', 'region-label')
        .attr('transform', (d: any) => {
          const [x, y] = projection(d.coordinates) as [number, number];
          return `translate(${x},${y})`;
        })
        .attr('opacity', 0.4)
        .attr('dy', '.35em')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('text-anchor', 'middle')
        .text((d: any) => d.name);
    });
  }
}
